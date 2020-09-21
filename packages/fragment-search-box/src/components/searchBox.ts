import {LitElement, html, customElement, css, property, eventOptions} from 'lit-element';
import {SearchBoxEvent, SearchBoxHistoryEvent} from "../event";
import {eventType} from '@type/common-variable';
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { from } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const http = new HttpLink({
    uri: "http://localhost:4000"
});
const link = from([http]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

@customElement('search-box')
export class SearchBox extends LitElement {
    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
    @property({type: String})
    keyword = `${this.getKeyword()}`;

    @property({type: Array})
    items = [];

    getKeyword() {
        return new URLSearchParams(location.search).get('q') || '';
    }

    render() {
        return html`
         <div>
            <input type="text" id="keyword" @change="${this._onChange}" value="${this.keyword}"><button @click="${this._onClick}">検索</button>     
            ${this.items.map((item: any) => {
                return html`<product-item name=${item.name}></product-item>`
            })}
         </div>
    `;
    }

    @eventOptions({capture: true})
    private async _onClick() {
        this.dispatchKeywordEvent(this.keyword);
        this.dispatchHistoryEvent(this.keyword);
    }

    dispatchKeywordEvent(keyword: string) {
        const search: SearchBoxEvent = {
            detail: {
                args: keyword,
                callback: (async (keyword: String) => {
                    const {data} = await client.query({
                            query: gql`
                                query  {
                                  products(filter: {name: "${keyword}"}) {
                                    name
                                    price
                                  }
                                }
                            `});
                    const products = data.products;
                    this.items = products;
                    const map = new Map();
                    this.update(map)
                }).bind(this)
            },
            cancelable: true
        };
        let event: CustomEvent = new CustomEvent(eventType.eventHubName, search);
        window.dispatchEvent(event);
    }

    dispatchHistoryEvent(keyword: string) {
        const search: SearchBoxHistoryEvent = {
            detail: {
                args: {
                    q: keyword
                },
            },
            cancelable: true
        };
        let event: CustomEvent = new CustomEvent(eventType.historyEventName, search);
        window.dispatchEvent(event);
    }

    @eventOptions({capture: true})
    private _onChange(e: Event) {
        this.keyword = (<HTMLInputElement>e.target).value;
    }

    connectedCallback() {
        super.connectedCallback();
        this.dispatchKeywordEvent(this.keyword);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'search-box': SearchBox;
    }
}
