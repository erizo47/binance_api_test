import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import '@/assets/styles/base.scss';
import { $restRequest } from '@/api-client/modules/rest-api/rest-api';
import { $websocketStreamClient } from '@/api-client/modules/websocket-api/websocket-api';

const app = createApp(App);

app.use(createPinia()
  .use(() => ({ $restRequest }))
  .use(() => ({ $websocketStreamClient })))
  .use(vuetify)
  .use(router)
  .mount('#app');
