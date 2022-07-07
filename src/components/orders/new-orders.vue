<template>
  <div>
    <h1>new order</h1>
    <table style="width: 80%; border: black 1px solid">
      <tr style="border: black 1px solid">
        <th class="th">User-id</th>
        <th class="th">Amount</th>
        <th class="th">Status</th>
        <th class="th">updated_at</th>
        <th class="th">action</th>

      </tr>
      <tr v-for="order in orders" :key="order.id">
        <td class="th">{{order.user_id}}</td>
        <td class="th">{{order.amount}}</td>
        <td class="th">{{order.status}}</td>
<!--        <td>{{// order.created_at}}</td>-->
        <td class="th">{{ order.updated_at}}</td>
        <td class="th">
          <button @click="confirmOrder(order.id)"> Confirm</button>
          <button @click="cancelOrder(order.id)"> Cancel</button>
        </td>

      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      orders:[]
    }
  },
  mounted() {
    this.newOrders()
  },
  methods: {
    newOrders() {
      return new Promise((resolve, reject) => {
        axios.get('/new-orders').then((res) => {
          this.orders = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    confirmOrder(id) {
        axios.get('/confirm-order/'+id).then((res) => {
          window.location.reload()
          return res;
        }).catch((error) => {
          return error
        })
    },
    cancelOrder(id){
      axios.get('/cancel-order/'+id).then((res) => {
        window.location.reload()
        return res;
      }).catch((error) => {
        return error
      })
    }
}}
</script>

<style scoped>
.th{
  border: 1px solid black;
}
</style>
