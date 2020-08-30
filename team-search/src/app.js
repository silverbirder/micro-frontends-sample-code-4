import Vue from 'vue';
import store from './store'
import router from "./router";

const createApp = (Component) => {
  const app = new Vue({
    store,
    router,
    render: h => h(Component),
  });
  return { app, router, store };
};

export default createApp;