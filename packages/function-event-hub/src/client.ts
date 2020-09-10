import {IMyEvent} from "./event";
import {eventType} from '@type/common-variable'

window.addEventListener(eventType.eventHubName, async (e: Event) => {
    e.preventDefault();
    const {args, callback} = (e as CustomEvent as IMyEvent<any, any>).detail;
    if (callback) {
        await callback(args);
    }
});

export {IMyEvent};
