import {LitElement, html, customElement, css} from 'lit-element';

@customElement('product-item')
export class ProductItem extends LitElement {
    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
    render() {
        return html`<div>item</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'product-item': ProductItem;
    }
}
