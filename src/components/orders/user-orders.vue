<template>
  <div class="orders">
    <div >
      <h1>My orders</h1>
      <router-link style="color: black; margin-left: 15px"  to="/search-order"> Search Order by number</router-link>
    </div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      items:[]
    }
  },
  mounted() {
    this.DeliveredOrders()
  },
  methods: {
    DeliveredOrders() {
      return new Promise((resolve, reject) => {
        axios.get('/user-orders').then((res) => {
          this.items = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    }
  }
}
</script>

<style scoped>
.orders{
  padding: 70px;
}
.orders div{
  display: flex;
  justify-content: space-between;
}
</style>
