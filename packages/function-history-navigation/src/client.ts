import {SearchBox} from "@search/fragment-search-box/build/components/search-box";

const searchBox = document.querySelector('search-box') as SearchBox | null;
searchBox?.addEventListener('search-box-keyword-history', async (e: Event) => {
    e.preventDefault();
    const {keyword} = (e as CustomEvent).detail;
    history.pushState({keyword: keyword}, "keyword", `?q=${keyword}`);
});
window.onpopstate = function (event: PopStateEvent) {
    if (event.state.keyword) {
        searchBox?.dispatchKeywordEvent(event.state.keyword)
    }
};
