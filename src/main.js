import { createApp } from 'vue';
import './assets/stylesheets/main.css';
import './assets/stylesheets/tailwind.css';
import App from './App.vue';
import router from './router/router.js';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');