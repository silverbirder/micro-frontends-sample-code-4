import {LoginButton} from './components/loginButton'
import {Auth, IAuth} from "./auth";

declare global {
    interface Window {
        auth: IAuth,
    }
}
window.auth = new Auth();

export default {
    LoginButton: new LoginButton()
}
