import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import '@/assets/styles/base.scss';
import { $client } from '@/api-client/modules/rest-api/rest-api';

const app = createApp(App);

app.use(createPinia()
  .use(() => ({ $client })))
  .use(vuetify)
  .use(router)
  .mount('#app');
