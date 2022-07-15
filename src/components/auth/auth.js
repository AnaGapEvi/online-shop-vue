import login from "./login";
import allUsers from "./all-users"
import registeredUsers from "./registered-users";
import NewUser from "./new-user";
import Home from "./Home";
import Verify from "./verify";
import Verified from "./verified";
import ForgotPassword from "./forgotPassword";
import UpdateUser from "./update-user";
import AuthBag from "./authBag";
import MyProfile from "./MyProfile";
import ShoppingInformation from "./shoppingInformation"; ShoppingInformation;
import OrderReports from "./OrderReports";


export default [
  { path: '/login', name:'Login', component: login },
  { path: '/sign-up', name:'SignUp', component: NewUser },
  { path: '/all-users', name:'AllUsers', component: allUsers },
  { path: '/registered-users', name:'Register', component: registeredUsers },
  { path: '/home-page', name:'Home', component: Home},
  { path: '/verify', name: 'Verify', component: Verify },
  { path: '/forgot-password', name: 'Forgot', component: ForgotPassword },
  { path: '/verified', name: 'Verified', component: Verified },
  { path: '/shopping-cart', name: 'Card', component: AuthBag},
  { path: '/update-user-data', name: 'UpdateUser', component: UpdateUser},
  { path: '/my-profile', name: 'MyProfile', component: MyProfile},
  { path: '/shopping-information/:price', name: 'ShoppingInformation', component: ShoppingInformation},
  { path: '/order-reports', name: 'OrderReports', component: OrderReports},
]
