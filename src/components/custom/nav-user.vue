<template>
  <div class="nav">
    <h4>Admin Dashboard</h4>
    <b-navbar type="dark" variant="dark" style="height: 100vh">
      <b-navbar-nav style="padding: 5px; display: flex; flex-direction:column; align-items:baseline ; justify-content: end">
        <b-nav-text style="color: gray">CORE</b-nav-text>
        <router-link to="/dashboard"> Dashboard</router-link>

        <b-nav-item-dropdown text="Sub-Categories" right><br>
          <b-dropdown-item href="#"><router-link to="/new-product">  </router-link> </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Products" right><br>
          <b-dropdown-item href="/new-product"> New Product </b-dropdown-item>
          <b-dropdown-item href="/all-products">  All Products </b-dropdown-item>

        </b-nav-item-dropdown>
        <b-nav-item href="#">ORDER MANAGEMENT</b-nav-item><br>
        <b-nav-item-dropdown text="Orders" right>
          <b-dropdown-item href="#">#</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href=""><router-link to="/order-reports">REPORTS</router-link></b-nav-item>
        <b-nav-item-dropdown text="Reports" right>
          <router-link to="/order-reports">REPORTS</router-link>
<!--          <b-dropdown-item href="/order-reports">##</b-dropdown-item>-->
        </b-nav-item-dropdown>
        <router-link to="/registered-users">Registered users</router-link>
        <b-nav-text style="background-color: gray; width: 100%; display: flex; align-items: end; justify-content: center">
          Logged in us admin
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      categories: [],
    }
  },
  created() {
    this.getCategories()
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
    reload(){

    }
  }
}
</script>

<style>
.nav{
  color: white;
}
router-link{
  text-decoration: none;
  color: white;
}
</style>
