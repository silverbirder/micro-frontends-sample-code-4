import Vue from "vue";
import Router from "vue-router";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";

Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        {
            path: '/search/box',
            component: SearchBox,
            name: 'box',
        },
        {
            path: '/search/pagination',
            component: Pagination,
            name: 'pagination',
        },
    ]
});