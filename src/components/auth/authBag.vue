<template>
  <div style="margin:0 auto">
    <table >
      <tr>
        <th>name</th>
        <th>price</th>
        <th>quantity</th>
        <th>image</th>
        <th></th>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td>{{product.name}}</td>
        <td :key="product.id">{{product.price*selected}}</td>
        <td>
          <select v-model="selected">
            <option v-for="item in product.quantity" :key="item.id" :value="selected"> {{item}} </option>
          </select>
        </td>
<!--        <td>-->
<!--          <select v-model="selected">-->
<!--            <option :selected="selected" v-for="item in product.quantity"> {{item}} </option>-->
<!--          </select>-->
<!--        </td>-->

        <td><img :src="`https://damp-taiga-05096.herokuapp.com/${product.image}`" alt="image book" height="100px" width="100px">        </td>
        <td>
          <b-button variant="danger" type="submit" @click="deleteProduct(product.pivot.id)"> Delete</b-button>
          <router-link to="/shopping-information"><b-button variant="info" type="submit"> Buy</b-button></router-link>
        </td>
      </tr>
    </table>
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
    }
  },

  mounted() {
    this.getCard()
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

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
