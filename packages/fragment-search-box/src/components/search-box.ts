import {LitElement, html, customElement, css, property, eventOptions} from 'lit-element';
import {SearchBoxEvent, SearchBoxHistoryEvent} from "../event";
import {eventType} from '@type/common-variable';
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { from } from "apollo-link";
import { HttpLink } from "apollo-link-http";

// Linkを定義
const http = new HttpLink({
    uri: "http://localhost:4000"
});
const link = from([http]);

// ApolloClientを呼び出しつつCacheを初期化
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

    getKeyword() {
        return new URLSearchParams(location.search).get('q') || '';
    }

    render() {
        return html`
         <div>
            <input type="text" id="keyword" @change="${this._onChange}" value="${this.keyword}"><button @click="${this._onClick}">検索</button>     
            <product-item></product-item>
         </div>
    `;
    }

    @eventOptions({capture: true})
    private _onClick() {
        client.query({
            query: gql`
                query  {
                  books {
                    title
                    author
                  }
                }
                `
        }).then((res) => {
            console.log(res.data)
        });
        this.dispatchKeywordEvent(this.keyword);
        this.dispatchHistoryEvent(this.keyword);
    }

    dispatchKeywordEvent(keyword: string) {
        const search: SearchBoxEvent = {
            detail: {
                args: keyword,
                callback: (async (_: String) => {
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
}

declare global {
    interface HTMLElementTagNameMap {
        'search-box': SearchBox;
    }
}
