<template>
  <div class="wish">
      <h2 >Wishlist</h2>
      <div class="list" style="display: flex;justify-content: space-between; width: 500px " v-for="item in wishlist" :key="item.id">
        <div>
          <p>{{ item.name }}</p>
          <p> Price: {{ item.price}}$</p>
          <b-button variant="outline-danger" @click="deleteItem(item.id)" >Delete</b-button>
          <b-button variant="outline-primary" @click="add(item.id)" >Add to cart</b-button>
          <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
          <b-button variant="outline-primary" v-if="token!==''"  :to="{ name: 'ShoppingInformation', params: { price: item.price }}">Buy</b-button>
          <hr style="color: white">
        </div>
        <div style="margin-left: 15px">
          <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+item.id}">
            <img :src="`https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80`"  height="150px" width="150px">
<!--            <img :src="`https://damp-taiga-05096.herokuapp.com/${item.image}`"  height="150px" width="150px">-->
          </router-link>
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
      token:'',
      heartId:''
    }
  },
  mounted() {
    this.wishlist=JSON.parse(localStorage.getItem('hearts'))
    this.heartId=JSON.parse(localStorage.getItem('heartId'))
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
  },
  methods:{
    deleteItem(id){
      this.wishlist = this.wishlist.filter((e)=>e.id !== id )
      this.heartId = this.heartId.splice(id, 1)
      localStorage.setItem('hearts', JSON.stringify(this.wishlist))
      localStorage.setItem('heartId', JSON.stringify(this.heartId))
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
 padding-top: 70px;
}
</style>
