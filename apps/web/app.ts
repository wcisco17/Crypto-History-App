import {createApp} from 'vue';
import './src/index.css';
import App from './src/App.vue';
import Index from './src/views/Home.vue';
import CryptoCoin from './src/views/CryptoCoin.vue';
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import Test from './src/views/Test.vue';
import ErrorView from './src/views/Error.vue';

// router
const routes: RouteRecordRaw[] = [
  { path: '/', component: Index },
  { path: '/error', component: ErrorView },
  { path: '/test', component: Test },
  { path: '/c/:coin/t/:timeseries', component: CryptoCoin }
];

// router instance
const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');

export default app;