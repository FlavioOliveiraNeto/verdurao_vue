import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@/assets/stylesheets/main.css';
import '@/assets/stylesheets/tailwind.css';
import App from '@/App.vue';
import router from '@/router/router.js';
import store from '@/store/store.js';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');