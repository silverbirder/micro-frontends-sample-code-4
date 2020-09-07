import {MyEvent} from "./event";

window.addEventListener('search-box-button-click', async (e: Event) => {
    e.preventDefault();
    const {args, callback} = (e as CustomEvent as MyEvent<String, String>).detail;
    if (callback) {
        await callback(args);
    }
});
