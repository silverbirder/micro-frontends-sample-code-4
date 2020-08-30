import createApp from './app';
import SearchBox from "./components/SearchBox";

const {app, store} = createApp(SearchBox);
store.replaceState(window.__INITIAL_STATE__)
app.$mount('#team-search-box');

window.postal.publish({
    channel: 'page',
    topic: 'search.ready',
});