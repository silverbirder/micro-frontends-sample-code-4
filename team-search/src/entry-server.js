import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import createApp from "./app";

export default ctx => {
    let component;
    const path = ctx.url.split('?')[0];
    switch (path) {
        case '/search/box':
            component = SearchBox;
            break;
        case '/search/pagination':
            component = Pagination;
            break;
    }
    const {app, router, store} = createApp(component);
    router.push(ctx.url);
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
        return Promise.reject({code: '404'})
    }
    return Promise.all(matchedComponents.map(component => {
        if (component.preFetch) {
            return component.preFetch(store, router.currentRoute)
        }
    })).then(() => {
        ctx.initialState = store.state;
        return app
    });

    return app
}