import {createApp} from 'vue'
import App from "./Vue/App.vue";
import {hostReactAppReady} from "../../common/js/usefuls";


(async () => {
  await hostReactAppReady()
  const app = createApp(App)
  app.mount('#vue-app')
})()
