<template>
  <div class="home">
    <h1 style="text-align: center; color: white" >Welcome to the world of books</h1>
    <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">

    <div v-if="products.length<=10">
        <div class="d-flex flex-wrap justify-content-center">
          <b-card style="max-width: 15rem;min-width: 15rem" class="w-20 m-3"  v-for="product in products"
                  :value="product.id"
                  :key="product.id"
          >
            <p class="heart"> <b-icon @click="addHeart(product.id)"  icon="heart-fill" style="color: blue" flip-h></b-icon></p>
            <p class="like" ><b-icon @click="addLike(product.id)" variant="primary" icon="hand-thumbs-up-fill" style="color: blue" ></b-icon></p>
            <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+product.id}">
              <img :src="`http://127.0.0.1:8000/${product.image}`" alt="image book" height="200px" width="200px">
              {{product.name }}
              <hr>
              <p>Price <b>{{product.price}}$</b>  </p>
              <p>Likes <b>{{product.likes}}</b>  </p>
            </router-link>
            <p> <router-link style="color: black"  :to=" {path: '/one-product/'+product.id}">Reviews</router-link></p>
            <b-button href="#" variant="success"> <router-link v-if="token===''" style="color: white"  to="/login">Buy</router-link></b-button>
            <b-button href="#" variant="success"> <router-link v-if="token!==''" style="color: white"  to="/shopping-information">Buy</router-link></b-button>
            <b-button @click="add(product.id)"  variant="primary" @keydown="modalShow = !modalShow"> Add to cart</b-button>
            <b-modal v-model="modalShow">Hello From Modal!</b-modal>

            <!--          <b-button href="#" variant="primary"> <router-link style="color: white" to="">Buy</router-link></b-button>-->
            <!--          <b-button href="#" variant="primary"> <router-link style="color: white" :to=" {path: 'edit-product/'+product.id}">Edit</router-link></b-button>-->
            <!--          <b-button href="#" variant="primary"> <router-link style="color: white" :to=" {path: 'one-product/'+product.id}">Add to Card</router-link></b-button>-->
          </b-card>
        </div>
    </div>
    <div v-else>

      <div  class="overflow-auto" >
        <div Class="d-flex flex-wrap justify-content-center">
          <b-card style="max-width: 15rem;min-width: 15rem " class="w-20 m-3"  v-for="product in products.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)"
                  :value="product.id"
                  :key="product.id"
          >
            <p class="heart"> <b-icon @click="addHeart(product.id)"  icon="heart-fill" style="color: blue" flip-h></b-icon></p>
            <p class="like" ><b-icon @click="addLike(product.id)" variant="primary" icon="hand-thumbs-up-fill" style="color: blue" ></b-icon></p>
            <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+product.id}">
              <img :src="`http://127.0.0.1:8000/${product.image}`" alt="image book" height="200px" width="200px">
              {{product.name }}
              <hr>
              <p>Price <b>{{product.price}}$</b>  </p>
              <p>Likes <b>{{product.likes}}</b>  </p>
            </router-link>
            <p> <router-link style="color: black"  :to=" {path: '/one-product/'+product.id}">Reviews</router-link></p>
            <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
            <b-button variant="outline-primary" v-if="token!==''"  to="/shopping-information">Buy</b-button>
            <b-button @click="add(product.id)"  variant="primary" @keydown="modalShow = !modalShow"> Add to cart</b-button>
            <b-modal v-model="modalShow">Hello From Modal!</b-modal>

            <!--          <b-button href="#" variant="primary"> <router-link style="color: white" to="">Buy</router-link></b-button>-->
            <!--          <b-button href="#" variant="primary"> <router-link style="color: white" :to=" {path: 'edit-product/'+product.id}">Edit</router-link></b-button>-->
            <!--          <b-button href="#" variant="primary"> <router-link style="color: white" :to=" {path: 'one-product/'+product.id}">Add to Card</router-link></b-button>-->
          </b-card>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-card"
          style="margin:0 auto"
        ></b-pagination>

      </div>
    </div>


  </div>

</template>



<script>
import axios from "axios";
export default {
  data(){
    return {
      perPage: 10,
      currentPage: 1,
      products:[],
      originalProducts: [],
      productSearch: '',
      modalShow: false,
      token:'',
      rate: {
        value:  null,
        comment: '',
        product_id: ''
      },

      card:{
        quantity:1,
        product_id:null
      },
      my:'',
      error:'',
      likes:[1],
      hearts:[],
    }
  },
  computed: {
    rows() {
      return this.products.length
    }
  },
  created() {
    this.getProduct()
  },
  mounted() {
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
    this.my = localStorage.getItem('access_token')
    this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
    this.hearts = JSON.parse(localStorage.getItem('hearts'))
  },
  methods: {
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
    getProduct() {
      return new Promise((resolve, reject) => {
        axios.get('products').then((res) => {
          this.products = res.data
          this.originalProducts = this.products;
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    add(id){
      this.card.product_id = id
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
    formSubmit(){
      axios.post('/new-review', this.rate)
        .then((resp)=> {
          if(resp){
            this.$router.push({name: "Home"})
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
          console.log(e)
        })
    },
    addHeart(id){
      axios.get('/product/'+id)
        .then((resp)=> {
          if(resp){
            this.hearts=JSON.parse(localStorage.getItem('hearts'))

            this.hearts.push(resp.data)
            localStorage.setItem('hearts', JSON.stringify([...this.hearts]))
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
          console.log(e)
        })
    },
    addLike(id){
      if(this.likes.includes(id)===false){
        axios.get('/like-product/'+id)
          .then((resp)=> {

              this.likes=JSON.parse(localStorage.getItem('likes')) || []
              this.likes.push(resp.data.id)
              localStorage.setItem('likes', JSON.stringify([...this.likes]))
              window.location.reload()

          })
          .catch((e) =>{
            console.log(e)
          })
      } else{
      console.log('error')
    }

    }
  }
}
</script>

<style scoped>
.heart{
  position: absolute;
}
.like{
  position: absolute;
  margin-left: 25px;
}
.heart:active{
  background-color: red;
}
.like:active{
  background-color: blue;
}
.home{
  background-image: url("https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg");
  min-height: 100vh;
  padding:40px;
}
</style>
