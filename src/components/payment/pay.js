import Stripe from "./paymentStripe";
import Cart from "./CardCvv"


export default [
  { path: '/payment/:price', name:'Payment', component: Stripe },
  { path: '/cart', name:'Cart', component: Cart }

]
