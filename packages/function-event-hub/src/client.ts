import {eventHubName, IMyEvent} from "./event";

window.addEventListener(eventHubName, async (e: Event) => {
    e.preventDefault();
    const {args, callback} = (e as CustomEvent as IMyEvent<String, String>).detail;
    if (callback) {
        await callback(args);
    }
});

export {IMyEvent};
