import * as puppeteer from 'puppeteer';
import * as url from 'url';
import { dirname } from 'path';

import { Config } from './config';

type SerializedResponse = {
  status: number;
  customHeaders: Map<string, string>;
  content: string;
};


const MOBILE_USERAGENT =
  'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Mobile Safari/537.36';

export class Renderer {
  private browser: puppeteer.Browser;
  private config: Config;

  constructor(browser: puppeteer.Browser, config: Config) {
    this.browser = browser;
    this.config = config;
  }

  async serialize(requestUrl: string, isMobile: boolean):
    Promise<SerializedResponse> {
    function stripPage() {
      const elements = document.querySelectorAll('script:not([type]), script[type*="javascript"], script[type="module"], link[rel=import]');
      for (const e of Array.from(elements)) {
        e.remove();
      }
    }

    function injectBaseHref(origin: string) {
      const base = document.createElement('base');
      base.setAttribute('href', origin);

      const bases = document.head.querySelectorAll('base');
      if (bases.length) {
        const existingBase = bases[0].getAttribute('href') || '';
        if (existingBase.startsWith('/')) {
          if (existingBase === '/') {
            bases[0].setAttribute('href', origin);
          } else {
            bases[0].setAttribute('href', origin + existingBase);
          }
        }
      } else {
        document.head.insertAdjacentElement('afterbegin', base);
      }
    }

    const page = await this.browser.newPage();

    await page.setViewport({ width: this.config.width, height: this.config.height, isMobile });

    if (isMobile) {
      page.setUserAgent(MOBILE_USERAGENT);
    }

    page.evaluateOnNewDocument('customElements.forcePolyfill = true');
    page.evaluateOnNewDocument('ShadyDOM = {force: true}');
    page.evaluateOnNewDocument('ShadyCSS = {shimcssproperties: true}');

    let response: puppeteer.Response | null = null;
    page.addListener('response', (r: puppeteer.Response) => {
      if (!response) {
        response = r;
      }
    });

    try {
      response = await page.goto(
        requestUrl, { timeout: this.config.timeout, waitUntil: 'networkidle0' });
    } catch (e) {
      console.error(e);
    }

    if (!response) {
      console.error('response does not exist');
      await page.close();
      return { status: 400, customHeaders: new Map(), content: '' };
    }

    if (response.headers()['metadata-flavor'] === 'Google') {
      await page.close();
      return { status: 403, customHeaders: new Map(), content: '' };
    }

    let statusCode = response.status();
    const newStatusCode =
      await page
        .$eval(
          'meta[name="render:status_code"]',
          (element) => parseInt(element.getAttribute('content') || ''))
        .catch(() => undefined);
    if (statusCode === 304) {
      statusCode = 200;
    }

    if (statusCode === 200 && newStatusCode) {
      statusCode = newStatusCode;
    }

    const customHeaders = await page
      .$eval(
        'meta[name="render:header"]',
        (element) => {
          const result = new Map<string, string>();
          const header = element.getAttribute('content');
          if (header) {
            const i = header.indexOf(':');
            if (i !== -1) {
              result.set(
                header.substr(0, i).trim(),
                header.substring(i + 1).trim());
            }
          }
          return JSON.stringify([...result]);
        })
      .catch(() => undefined);

    await page.evaluate(stripPage);
    const parsedUrl = url.parse(requestUrl);
    await page.evaluate(
      injectBaseHref, `${parsedUrl.protocol}//${parsedUrl.host}${dirname(parsedUrl.pathname || '')}`);

    const result = await page.content() as string;

    await page.close();
    return { status: statusCode, customHeaders: customHeaders ? new Map(JSON.parse(customHeaders)) : new Map(), content: result };
  }
}
