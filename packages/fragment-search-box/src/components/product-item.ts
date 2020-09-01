import {LitElement, html, customElement, css, property} from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
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
    @property()
    name: String = '';

    render() {
        return html`
        <div>product item ${this.name}</div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'product-item': ProductItem;
    }
}
