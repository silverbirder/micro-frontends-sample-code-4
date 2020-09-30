import {LitElement, html, customElement, css} from 'lit-element';

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
    loginStatus: boolean = false;

    constructor() {
        super();

        this.addEventListener('is-login', async (e: any) => {
            console.log(e);
            this.loginStatus = e.detail.isLogin;
            const map = new Map();
            this.update(map)
        });
    }

    render() {
        return html`
        <div>
        ${this.loginStatus ?
            html`<button @click="${this._logout}">Click to Logout</button>` :
            html`<button @click="${this._login}">Click to Login</button>`}
        </div>`;
    }

    private async _login(_: Event) {
        await window.auth.login();
    }

    private async _logout(_: Event) {
        await window.auth.logout()
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'login-button': LoginButton;
    }
}
