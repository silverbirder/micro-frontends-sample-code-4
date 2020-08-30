import createApp from './app';
import Pagination from "./components/Pagination";

const {app, store} = createApp(Pagination);
store.replaceState(window.__INITIAL_STATE__)
app.$mount('#team-search-pagination');

window.postal.publish({
    channel: 'page',
    topic: 'search.ready',
});