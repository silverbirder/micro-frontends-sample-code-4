import {LitElement, html, customElement, css, property, eventOptions} from 'lit-element';
import {eventType, SearchBoxEvent, SearchBoxHistoryEvent} from "../event";

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
    keyword = '';

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
        let event: CustomEvent = new CustomEvent(eventType['search-box-button-click'], search);
        window.dispatchEvent(event);
    }

    dispatchHistoryEvent(keyword: string) {
        const search: SearchBoxHistoryEvent = {
            detail: {
                args: keyword,
            },
            cancelable: true
        };
        let event: CustomEvent = new CustomEvent(eventType['search-box-keyword-history'], search);
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
