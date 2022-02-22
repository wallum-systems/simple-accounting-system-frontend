import {createApp} from 'vue/dist/vue.esm-bundler'
// import axios from "axios";
import {createRouter, createWebHashHistory} from 'vue-router';
// import {DefaultApi} from "../generated-sources/openapi/dist/api";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import RecordNew from "@/components/RecordNew";
import Home from "@/components/Home";
import App from "@/App";

const routes = [
    {path: '/', component: Home},
    {path: '/record/new', component: RecordNew},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
