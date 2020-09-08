import {IHistoryEvent} from './event'

// const searchBox = document.querySelector('search-box');
window.addEventListener('search-box-keyword-history', async (e: Event) => {
    e.preventDefault();
    const {args} = (e as CustomEvent as IHistoryEvent<String>).detail;
    history.pushState({keyword: args}, "keyword", `?q=${args}`);
});
window.onpopstate = function (event: PopStateEvent) {
    if (event.state.keyword) {
        // searchBox?.dispatchKeywordEvent(event.state.keyword)
    }
};

export {IHistoryEvent}
