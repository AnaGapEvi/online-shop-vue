<template>
  <div class="wish">
      <h2 >Wishlist</h2>
      <div class="list" style="display: flex;justify-content: space-between; width: 500px " v-for="item in wishlist">
        <div>
          <p>{{ item.name }}</p>
          <p> Price: {{ item.price}}$</p>
<!--          <button type="submit" > Delete</button>-->
<!--          <button type="submit" > Add to cart</button>-->
          <b-button variant="outline-danger" @click="deleteItem(item.id)" >Delete</b-button>
          <b-button variant="outline-primary" @click="add(item.id)" >Add to cart</b-button>
          <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
          <b-button variant="outline-primary" v-if="token!==''"  to="/shopping-information">Buy</b-button>
          <hr style="color: white">
        </div>
        <div style="margin-left: 15px">
          <img :src="`http://127.0.0.1:8000/${item.image}`" alt="image book" height="150px" width="150px">
          <hr style="color: white">
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      wishlist:[],
      card:{
        quantity:1,
        product_id:null
      },
      token:''
    }
  },
  mounted() {
    this.wishlist=JSON.parse(localStorage.getItem('hearts'))
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
  },
  methods:{
    deleteItem(id){
      console.log(id)
      this.wishlist = this.wishlist.filter((e)=>e.id !== id )
      localStorage.setItem('hearts', JSON.stringify(this.wishlist))
    },
    add(id){
      this.card.product_id = id
      axios.post('/add-card', this.card)
        .then((resp)=> {
          if(resp){
            this.wishlist = this.wishlist.filter((e)=>e.id !== id )
            localStorage.setItem('hearts', JSON.stringify(this.wishlist))
            return resp.data
            // this.$router.push({name: "Home"})
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
            this.$router.push({name: "Login"})
          })
    },
  }
}
</script>

<style scoped>
.list{
  width: 40%;
  color: white;
  margin: 0 auto;
}
h2{
  color: white;
  text-align: center;
  margin: 20px;
}
.wish{
  min-height: 100vh;
  background-color: #343a40;
 padding-top: 15px;
}
</style>
