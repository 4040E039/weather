import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './style/style.stylus'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
