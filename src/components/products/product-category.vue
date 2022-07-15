<template>
  <div class="category" >
<!--    <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">-->

    <b-card style="max-width: 15rem;min-width: 15rem" class="w-20 m-3"  v-for="product in products" :kay="product.id"
                :value="product.id"
                :key="product.id"
        >
          <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+product.id}">
            <img :src="`https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80`"  height="200px" width="200px" >
<!--            <img :src="`https://damp-taiga-05096.herokuapp.com/${product.image}`"  height="200px" width="200px" >-->
            {{product.name }}
            <hr>
            <p>Price <b>{{product.price}}$</b>  </p>
          </router-link>
<!--          <b-button href="#" variant="primary"> <router-link style="color: white" :to=" {path: 'edit-product/'+product.id}">Edit</router-link></b-button>-->
          <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
          <b-button variant="outline-primary" v-if="token!==''"  :to="{ name: 'ShoppingInformation', params: { price: product.price }}">Buy</b-button>
           <b-button @click="add(product.id)"  variant="primary"> Add to cart</b-button>
      </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      originalProducts: [],

      productSearch: '',
      bag:{},
      count:0,
      token:'',
      card:{
        quantity:1,
        product_id:null
      },
      products: {},
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
    searchProducts: function()
    {
      if(this.productSearch == '')
      {
        this.products = this.originalProducts;
        return;
      }
      let searchedProducts = [];
      for(let i = 0; i < this.originalProducts.length; i++)
      {
        let productName = this.originalProducts[i]['name'].toLowerCase();
        if(productName.indexOf(this.productSearch.toLowerCase()) >= 0)
        {
          searchedProducts.push(this.originalProducts[i]);
        }
      }
      this.products = searchedProducts;
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

.category{
  background-image: url("https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg");
  min-height: 100vh;
  padding:40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
