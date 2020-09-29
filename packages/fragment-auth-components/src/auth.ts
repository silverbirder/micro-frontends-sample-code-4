import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import createAuth0Client from "@auth0/auth0-spa-js";
import {auth0Settings} from "./auth0.settings";
import {RedirectLoginOptions} from "@auth0/auth0-spa-js/src/global";

export interface IAuth {
    auth0: Auth0Client | undefined
    login(url?: String): Promise<void>

    logout(): Promise<void>

    configureClient(): Promise<void>;

    callApi(): Promise<void>;
}

export class Auth implements IAuth {
    auth0: Auth0Client | undefined;

    async configureClient() {
        this.auth0 = await createAuth0Client({
            domain: auth0Settings.domain,
            client_id: auth0Settings.clientId,
            cacheLocation: 'localstorage'
        });

        const query = window.location.search;
        const shouldParseResult = query.includes("code=") && query.includes("state=");
        if (shouldParseResult) {
            try {
                await this.auth0!!.handleRedirectCallback();
            } catch (err) {
                console.log("Error parsing redirect:", err);
            }
        }
    }

    async login(targetUrl?: String) {
        try {
            const options: RedirectLoginOptions = {
                redirect_uri: window.location.origin
            };
            if (targetUrl) {
                options.appState = {targetUrl};
            }
            await this.auth0!!.loginWithRedirect(options);
        } catch (err) {
            console.log("Log in failed", err);
        }
    }

    async logout() {
        try {
            this.auth0!!.logout({
                returnTo: window.location.origin
            });
        } catch (err) {
            console.log("Log out failed", err);
        }
    }

    async requireAuth(fn: Function, targetUrl: String) {
        const isAuthenticated = await this.auth0!!.isAuthenticated();
        if (isAuthenticated) {
            return fn();
        }
        return this.login(targetUrl);
    }

    async callApi() {
        try {
            const token = await this.auth0!!.getTokenSilently();
            console.log(token);
        } catch (e) {
            console.error(e);
        }
    }
}
