"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
require("./src/index.css");
var App_vue_1 = require("./src/App.vue");
var Home_vue_1 = require("./src/views/Home.vue");
var CryptoCoin_vue_1 = require("./src/views/CryptoCoin.vue");
var vue_router_1 = require("vue-router");
var Test_vue_1 = require("./src/views/Test.vue");
var Error_vue_1 = require("./src/views/Error.vue");
// router
var routes = [
    { path: '/', component: Home_vue_1.default },
    { path: '/error', component: Error_vue_1.default },
    { path: '/test', component: Test_vue_1.default },
    { path: '/c/:coin/t/:timeseries', component: CryptoCoin_vue_1.default }
];
// router instance
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes
});
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(router);
app.mount('#app');
exports.default = app;
