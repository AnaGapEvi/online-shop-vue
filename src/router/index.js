import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import AllProd from "../components/AllProducts";
import HelloWorld from '@/components/products/all-products'
import auth from "../components/auth/auth";
import order from "../components/orders/order";
import product from "../components/products/product";
import pay from "../components/payment/pay";
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello,
    // },
    {
      path: '/all',
      name:' AllProd',
      component:AllProd
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    ...auth,
    ...order,
    ...product,
    ...pay
  ]
})
