import { createApp } from 'vue';
import '@/assets/stylesheets/main.css';
import '@/assets/stylesheets/tailwind.css';
import App from '@/App.vue';
import router from '@/router/router.js';
import store from '@/store/store.js';

const app = createApp(App);

app.use(router);

store.dispatch('auth/initializeStore').then(() => {
    app.use(store).mount('#app');
});