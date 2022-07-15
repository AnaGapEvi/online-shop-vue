// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {StripeCheckout, StripeElementCard} from "@vue-stripe/vue-stripe";
import router from './router'
import Paginate from 'vuejs-paginate'
import Pagination from 'vue-pagination-2';

require ('./components/custom/custom')
require ('./plugins');

Vue.component('Paginate', Paginate)
Vue.component('StripeCheckout', StripeCheckout)
Vue.component('StripeElementCart', StripeElementCard)
Vue.component('pagination', Pagination);


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  components: { App },
  template: '<App/>'
})
