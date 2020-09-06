import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koaCompress from 'koa-compress';
import * as route from 'koa-route';
import * as koaLogger from 'koa-logger';
import * as puppeteer from 'puppeteer';
import * as url from 'url';

import { Renderer } from './renderer';
import { Config, ConfigManager } from './config';

/**
 * Rendertron rendering service. This runs the server which routes rendering
 * requests through to the renderer.
 */
export class Rendertron {
  app: Koa = new Koa();
  private config: Config = ConfigManager.config;
  private renderer: Renderer | undefined;
  private port = process.env.PORT || null;
  private host = process.env.HOST || null;

  async createRenderer(config: Config) {
    const browser = await puppeteer.launch({ args: config.puppeteerArgs });

    browser.on('disconnected', () => {
      this.createRenderer(config);
    });

    this.renderer = new Renderer(browser, config);
  }

  async initialize(config?: Config) {
    // Load config
    this.config = config || await ConfigManager.getConfiguration();

    this.port = this.port || this.config.port;
    this.host = this.host || this.config.host;

    await this.createRenderer(this.config);

    this.app.use(koaLogger());

    this.app.use(koaCompress());

    this.app.use(bodyParser());

    this.app.use(
      route.get('/render/:url(.*)', this.handleRenderRequest.bind(this)));

    return this.app.listen(+this.port, this.host, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  /**
   * Checks whether or not the URL is valid. For example, we don't want to allow
   * the requester to read the file system via Chrome.
   */
  restricted(href: string): boolean {
    const parsedUrl = url.parse(href);
    const protocol = parsedUrl.protocol || '';

    if (!protocol.match(/^https?/)) {
      return true;
    }

    if (parsedUrl.hostname && parsedUrl.hostname.match(/\.internal$/)) {
      return true;
    }

    return false;
  }

  async handleRenderRequest(ctx: Koa.Context, url: string) {
    if (!this.renderer) {
      throw (new Error('No renderer initalized yet.'));
    }

    if (this.restricted(url)) {
      ctx.status = 403;
      return;
    }

    const mobileVersion = 'mobile' in ctx.query ? true : false;

    const serialized = await this.renderer.serialize(url, mobileVersion);

    for (const key in this.config.headers) {
      ctx.set(key, this.config.headers[key]);
    }

    // Mark the response as coming from Rendertron.
    ctx.set('x-renderer', 'rendertron');
    // Add custom headers to the response like 'Location'
    serialized.customHeaders.forEach((value: string, key: string) => ctx.set(key, value));
    ctx.status = serialized.status;
    ctx.body = serialized.content;
  }
}

async function logUncaughtError(error: Error) {
  console.error('Uncaught exception');
  console.error(error);
  process.exit(1);
}

// The type for the unhandleRejection handler is set to contain Promise<any>,
// so we disable that linter rule for the next line
// tslint:disable-next-line: no-any
async function logUnhandledRejection(reason: unknown, _: Promise<any>) {
  console.error('Unhandled rejection');
  console.error(reason);
  process.exit(1);
}

// Start rendertron if not running inside tests.
if (!module.parent) {
  const rendertron = new Rendertron();
  rendertron.initialize();

  process.on('uncaughtException', logUncaughtError);
  process.on('unhandledRejection', logUnhandledRejection);
}
