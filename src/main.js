import './assets/stylesheets/main.css'
import './assets/stylesheets/tailwind.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";

const app = createApp(App);
app.use(router);
app.mount("#app");
