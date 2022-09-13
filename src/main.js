// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {StripeCheckout, StripeElementCard} from "@vue-stripe/vue-stripe";
import router from './router'
import Paginate from 'vuejs-paginate'

require ('./components/custom/custom')
require ('./plugins');

Vue.component('Paginate', Paginate)
Vue.use(StripeCheckout)
Vue.use(StripeElementCard)


Vue.config.productionTip = false
/* eslint-disable no-new */
// Vue.prototype.$isAuth = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
