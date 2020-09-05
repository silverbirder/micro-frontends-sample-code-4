const searchBox = document.querySelector('search-box');
searchBox?.addEventListener('search-box-button-click', async (e: Event) => {
    e.preventDefault();
    const {keyword, callback} = (e as CustomEvent).detail;
    if (callback) {
        await callback(keyword);
    }
});
searchBox?.addEventListener('search-box-keyword-history', async (e: Event) => {
    e.preventDefault();
    const {keyword} = (e as CustomEvent).detail;
    history.pushState({keyword: keyword}, "keyword", `?q=${keyword}`);
});
