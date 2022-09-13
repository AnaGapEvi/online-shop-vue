<template>
  <div class="nav">
    <b-navbar style="z-index: 1" toggleable="lg" type="dark" variant="dark" class="d-flex justify-content-between w-100  position-fixed text-decoration-none">
      <b-navbar-brand  > <button @click="shoppingPortal" style="border: none; background-color: unset; color: white ">Shopping portal</button></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse"  class="w-100"  is-nav >
        <div style="display: flex; width: 50%"  v-for="category in categories" :key="category.id">
          <b-navbar-nav style="color: white; margin:0px 10px 0px 10px">
            <router-link :to="{ path: '/categories-product/'+ category.id}" >Adventure books</router-link>
          </b-navbar-nav>
        </div>
        <div style="display: flex; width: 45%; justify-content: flex-end; align-items: center">
          <b-navbar-nav class="d-flex justify-content-evenly" >
            <b-nav-item href="/wishlist"> <b-icon icon="heart" aria-hidden="true"></b-icon>  </b-nav-item>
            <b-nav-item href="#"><router-link to="/shopping-cart"><b-icon icon="cart3" aria-hidden="true" style="color: white" ></b-icon> </router-link> </b-nav-item>
          </b-navbar-nav>
          <div v-if="email === ''" class="d-flex justify-content-between align-items-center">
            <b-nav-item :to="{ name: 'SignUp' }"> Sign up </b-nav-item>
            <b-nav-item :to="{ name: 'Login' }"> Sign in </b-nav-item>
          </div>
          <b-nav-item-dropdown class="w-20 " v-if="email !== ''" style="color: white"  right>
            <!-- Using 'button-content' slot -->
            <template #button-content class="d-flex align-items-center" >
              <em style="color: white">{{email}}</em>
            </template>

            <b-dropdown-item v-if="role ==='admin'" href="#"><router-link to="/dashboard"> My Account</router-link></b-dropdown-item>
            <b-dropdown-item v-if="role ==='user'" href="#"><router-link to="/my-profile"> My Account</router-link></b-dropdown-item>

            <b-dropdown-item href="#">
              <a href="/login" @click.prevent="logout()" >
                Logout
              </a>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav v-if="role !== ''" style="color: #dddddd" href="/orders"><router-link style="text-decoration: none; color: #dddddd" to="/user-order"> Orders</router-link></b-navbar-nav>
        </div>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
// import SearchOrder from "../orders/searchOrder";

export default {
  // components: {SearchOrder},
  data(){
   return{
     email:'',
     role:'',
     keyword: null,
     Books: [],
     heart:[],
     categories: [],
     search:'',
     order:{},
     page: 1

   }
 },

  created() {
   if (localStorage.getItem('access_token')){
             this.getMy()
   }
    this.getCategories()
    this.heart = JSON.parse(localStorage.getItem('hearts'))
  },

  methods: {
    getCategories() {
        return new Promise((resolve, reject) => {
          axios.get('categories').then((res) => {
            this.categories = res.data
             return resolve(true);
          }).catch((error) => {
            return reject(error)
          })
        })
    },
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {
            this.email = result.data.user.email
            this.role = result.data.user.role
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    logout(){
      axios.get('/logout').then(result => {
        localStorage.removeItem('access_token');
        this.email=''
        this.role=''
        // this.$router.push({name: "HelloWorld"})
        // window.location.reload()

      }).catch(error => {
        return error
      })
    },
    shoppingPortal(){
       this.page = localStorage.getItem('page')
      this.page = 1
      // this.page = localStorage.getItem('page')
      localStorage.setItem('page', this.page)
      this.$router.push({ name: 'HelloWorld' })
      // window.location.reload()
    },

    searchOrderNum(){
      alert(typeof Number(this.search))
            this.$router.push({name: 'SearchOrder'})
    }
  }
}
</script>

<style scoped>
.nav{
  display: flex;
  justify-content: space-between;
}
</style>
