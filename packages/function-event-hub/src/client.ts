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
export {IMyEvent};
