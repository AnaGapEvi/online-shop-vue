<template>
  <div class="category" >
        <b-card style="max-width: 15rem;min-width: 15rem" class="w-20 m-3"  v-for="product in products" :kay="product.id"
                :value="product.id"
                :key="product.id"
        >
          <b-icon @click="addheart(product.id)" class="heart" icon="heart" style="color: red" flip-h></b-icon>
          <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+product.id}">
            <img :src="`https://damp-taiga-05096.herokuapp.com/${product.image}`" alt="image " height="200px" width="200px" >
            {{product.name }}
            <hr>
            <p>Price <b>{{product.price}}$</b>  </p>
          </router-link>
<!--          <b-button href="#" variant="primary"> <router-link style="color: white" :to=" {path: 'edit-product/'+product.id}">Edit</router-link></b-button>-->
          <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
          <b-button variant="outline-primary" v-if="token!==''"  to="/shopping-information">Buy</b-button>
           <b-button @click="add(product.id)"  variant="primary"> Add to cart</b-button>
      </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      bag:{},
      count:0,
      token:'',
      card:{
        quantity:1,
        product_id:null
      },
      products:[],
      rate: {
        value:  3,
        comment: '',
        product_id: ''
      },
      hearts:[]
    }
  },
  computed: {
    rows() {
      return this.products.length
    }
  },
  mounted() {
    this.getProduct()
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
  },
  methods: {
    getProduct() {
      return new Promise((resolve, reject) => {
        axios.get('/categories-product/' + this.$route.params.id).then((res) => {
          this.products = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    formSubmit(){
      axios.post('/new-review', this.rate)
        .then((resp)=> {
          if(resp){
            // this.$router.push({name: "Home"})
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
          console.log(e)
        })
    },
    add(id){
      this.card.product_id=id
      axios.post('/add-card', this.card)
        .then((resp)=> {
          if(resp){
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
    addheart(id){
      axios.get('/product/'+id)
        .then((resp)=> {
          if(resp){
            this.hearts.push(resp.data)
            localStorage.setItem('hearts', JSON.stringify([...this.hearts]))
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.products{
  display: flex;
  flex-wrap: wrap;
}
.prod{
  margin-top: 150px;
}
.heart{
  position: absolute;
}
.heart:active{
  background-color: red;
}
.category{
  background-color: #698d94;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  /*background-image: url("https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg");*/
  /*height: 100vh;*/
  padding:40px;
}
</style>
