import NewProduct from "./new-product";
import Edit from "./editProduct";
import AllProducts from "./all-products";
import OneProduct from "./one-product";
import ProductCategory from "./product-category";
import Wishlist from "./wishlist";
import StripeElement from "./stripe-element";
import StripeCheckout from "./stripe-element";
import Vue from "vue";
Vue.component(StripeElement)
export default [
  { path: '/all-products',name: 'Products', component: AllProducts },
  { path: '/edit-product/:id', name:'EditProduct', component: Edit },
  { path: '/new-product', name:'NewProduct', component: NewProduct },
  { path: '/one-product/:id', name:'OneProduct', component: OneProduct },
  { path: '/categories-product/:id', name:'ProductCategory', component: ProductCategory },
  { path: '/wishlist', name:'Wishlist', component: Wishlist },
  { path: '/stripe-element', name:'StripeElement', component: StripeElement },
  { path: '/stripe-checkout', name:'StripeCheckout', component: StripeCheckout },

]
