import {IMyEvent} from "./event";
import {eventType} from '@type/common-variable'
import {fromEvent} from "rxjs";

fromEvent(window, eventType.eventHubName)
    .subscribe(async (e: Event) => {
        e.preventDefault();
        const {args, callback} = (e as CustomEvent as IMyEvent<any, any>).detail;
        if (callback) {
            await callback(args);
        }
    });
fromEvent(window, eventType.authEventName)
    .subscribe(async (e: Event) => {
        e.preventDefault();
        const {args} = (e as CustomEvent as IMyEvent<any, any>).detail;
        document.querySelector('login-button')?.dispatchEvent(new CustomEvent("is-login", {detail: {isLogin: args}}))
    });
export {IMyEvent};
