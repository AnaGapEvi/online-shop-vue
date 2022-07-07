<template>
  <div>
    <h1>My orders</h1>
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

</style>
