import {LitElement, html, customElement, css, property} from 'lit-element';

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
    @property({type: String})
    name = ``;

    render() {
        return html`<div>${this.name}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'product-item': ProductItem;
    }
}
