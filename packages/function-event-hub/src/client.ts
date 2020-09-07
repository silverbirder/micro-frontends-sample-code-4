window.addEventListener('search-box-button-click', async (e: Event) => {
    e.preventDefault();
    const {keyword, callback} = (e as CustomEvent).detail;
    if (callback) {
        await callback(keyword);
    }
});
