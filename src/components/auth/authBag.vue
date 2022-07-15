<template>
  <div class="bag" style="margin:0 auto">
    <p v-if="products.length===0">There are no product in cart.... <router-link style="text-decoration: none" to="/">shopping</router-link> </p>
    <table v-else>
      <tr>
        <th>name</th>
        <th>price</th>
        <th>quantity</th>
        <th>image</th>
        <th>Action</th>
      </tr>
      <tr v-for="(product, item) in products" :key="product.id">
        <td>{{product.name}}</td>
        <td >
          {{products[item].price*products[item].pivot.quantity}} $
        </td>
        <td>
          <span class="button_item" @click="decrementItem(product.pivot.id, item)">-</span>
          {{products[item].pivot.quantity}}
          <span class="button_item" @click="incrementItem(product.pivot.id, item)">+</span>
        </td>
        <td>
          <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+product.id}">
<!--            <img :src="`http://127.0.0.1:8000/${product.image}`" height="100px" width="100px">-->
            <img :src="`https://damp-taiga-05096.herokuapp.com/${product.image}`" height="100px" width="100px">

          </router-link>
        </td>
        <td>
          <b-button variant="danger" type="submit" @click="deleteProduct(product.pivot.id)"> Delete</b-button>
          <router-link :to="{ name: 'ShoppingInformation', params: { price: products[item].price*products[item].pivot.quantity }}"><b-button variant="info" type="submit">  Buy</b-button></router-link>
        </td>
      </tr>
    </table>

    Total: {{total}} $
    <router-link :to="{ name: 'ShoppingInformation', params: { price: total }}"><b-button variant="info" type="submit">  Pay</b-button></router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      fields: ['name', 'price', 'images', { label: 'Quantity', key: 'pivot.quantity'}, 'action'],
      products:[],
      selected:1,
      quantity:1
    }
  },
  computed: {
    total(){
      let sum=0
      this.products.map(x=>{
        sum = sum + (x.price * x.pivot.quantity)
      })
      return sum
    }
  },
  mounted() {
    this.getCard()
    console.log(this.products.length)
  },
  methods:{
    getCard() {
      return new Promise((resolve, reject) => {
        axios.get('/shopping-cart').then((res) => {
          this.products = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    deleteProduct(id){
      axios.delete('/delete-bag/'+id)
        .then((resp)=> {
          if(resp){
            window.location.reload()
            // this.$router.push({name: "Home"})
          } else {
            console.log('this reviews not found')
          }
        })
    },

    incrementItem(item, id){
        axios.put(`/increment-quantity/${item}`)
          .then((resp) => {
            this.products[id].pivot.quantity=resp.data.quantity
          }).catch((error)=>{
          return error
        })
    },
    decrementItem(item, id){
        axios.get(`/decrement-quantity/${item}`)
          .then((resp) => {
            this.products[id].pivot.quantity=resp.data.quantity
          }).catch((error)=>{
          return error
        })
    }
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.button_item{
  cursor: pointer;
}
.bag{
  padding: 30px;
  background-color: #343a40;
  min-height: 100vh;
  color: white;
}
</style>
