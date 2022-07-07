import cancelledOrders from "./cancelled orders";
import newOrders from "./new-orders";
import deliveredOrders from "./delivered-orders";
import Dashboard from "./dashboard";
import TotalOrder from "./total-order";
import UserOrders from "./user-orders";
import SearchOrder from "./searchOrder";

export default [
  { path: '/cancelled-order', name:'Cancelled', component: cancelledOrders },
  { path: '/new-order', name:'New', component: newOrders },
  { path: '/delivered-order', name: 'Delivered', component: deliveredOrders},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard},
  { path: '/total-order', name: 'Total', component: TotalOrder},
  { path: '/user-order', name: 'Orders', component: UserOrders},
  { path: '/search-order', name: 'SearchOrder', component: SearchOrder},
]
