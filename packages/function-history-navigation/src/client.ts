import {IHistoryEvent} from './event'
import {Router} from '@vaadin/router';
import {eventType} from '@type/common-variable';
import {fromEvent} from "rxjs";
import {map} from 'rxjs/operators';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
    {path: '/(.*)', component: 'search-box'}
]);

fromEvent(window, eventType.historyEventName)
    .pipe(map((e: Event) => {
        e.preventDefault();
        let {args} = (e as CustomEvent as IHistoryEvent<any>).detail;
        if (history.state !== null) {
            args = Object.assign(history.state, args);
        }
        return args;
    }))
    .subscribe((args: any) => {
        const path = _jsonToParams(args);
        history.pushState(args, "", `/?${path}`);
    });

window.onpopstate = function (event: PopStateEvent) {
    const state = event.state;
    if (state) {
        const path = _jsonToParams(state);
        router.render(`/?${path}`)
    }
};

const _jsonToParams = function (j: any): string {
    return Object.keys(j).map(key => {
        return `${key}=${j[key]}`
    }).join('&');
};

export {IHistoryEvent}
