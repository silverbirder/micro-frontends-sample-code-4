import {LitElement, html, customElement, css} from 'lit-element';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import {auth0Settings} from "../auth0.settings";

@customElement('login-button')
export class LoginButton extends LitElement {
    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
    auth0: Auth0Client | undefined;

    constructor() {
        super();
        (async() => {
            this.auth0 = await createAuth0Client({
                domain: auth0Settings.domain,
                client_id: auth0Settings.clientId,
                redirect_uri: auth0Settings.redirectUri,
                cacheLocation: 'localstorage'
            });
            try {
                await this.auth0.getTokenSilently();
            } catch (error) {
                if (error.error !== 'login_required') {
                    throw error;
                }
            }
        })();
    }
    render() {
        return html`<button @click="${this._onClick}">Click to Login</button>`;
    }

    private _onClick(_: Event) {
        this.auth0?.loginWithRedirect()
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'login-button': LoginButton;
    }
}
