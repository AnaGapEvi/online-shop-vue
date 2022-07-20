<template>
  <div class="home">
    <h1 style="text-align: center; color: white" >Welcome to the world of books</h1>
    <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">
    <div v-if="products.length<=10" style="display: flex; flex-wrap: wrap; justify-content: center">
      <b-card style="max-width: 15rem;min-width: 15rem " class="w-20 m-3"  v-for="product in products"
              :value="product.id"
              :key="product.id"
      >
        <product-item :product="product"></product-item>
      </b-card>
    </div>
    <div v-else style="display: flex; flex-wrap: wrap">
      <div  class="overflow-auto"  >
        <div Class="d-flex flex-wrap justify-content-center" >
          <b-card style="max-width: 15rem;min-width: 15rem " class="w-20 m-3"  v-for="(product) in products.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage)"
                  :value="product.id"
                  :key="product.id"
          >
                <product-item :product="product"></product-item>
          </b-card>
        </div>
        <p @click="moveTo">
          <b-pagination

            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-card"
            style="margin:0 auto"
          ></b-pagination>
        </p>

      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import ProductItem from "../ProductItem";

export default {
  components: {ProductItem},
  data(){
    return {

      active_el:0,
      activeColor: 'red',
      fontSize: 30,
      count:'',
      currentHeart: this.mode,
      currentLike: this.mode,
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
      heartId:[],
      cart:{},
      page: 1,
      isLoading: true,
      className:'',
      moveToDown:false
    }
  },
  computed: {
    rows() {
      localStorage.setItem('page', this.currentPage)
      this.page=localStorage.getItem('page')
      this.currentPage=this.page;


      return this.products.length
    }
  },

  created() {

    this.getProduct()
    console.log(this.products)
    if (localStorage.getItem('page')){
      this.page=localStorage.getItem('page')
    }
  },
  mounted() {
    this.currentPage= localStorage.getItem('page')
    this.getCard()
        if(localStorage.getItem('access_token')){
          this.token=localStorage.getItem('access_token')
         }
      this.my = localStorage.getItem('access_token')
      this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
      this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
      this.heartId = JSON.parse(localStorage.getItem('heartId')) || []
  },
  methods: {
    click(){

        window.location.reload()


    },
    // resetScrollTop: function () {
    //   this.$refs.modalview.scrollTop = 0
    // },
    moveTo () {
      window.scrollTo(0,0);


      // let to = this.moveToDown
      //
      //   ? this.$refs.description.offsetTop - 700  : 0
      //
      // window.scroll({
      //   top: to,
      //   left: 0,
      //   behavior: 'smooth'
      // })
      //
      // this.moveToDown = !this.moveToDown
    },

    changeColor(){
      this.isLoading = !this.isLoading;
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
    getCard() {
      return new Promise((resolve, reject) => {
        axios.get('/shopping-cart').then((res) => {
          this.cart = res.data
          console.log(this.cart)
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
      // } else{
      //   this.card.quantity++
      // }
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
    addHeart(id, i){
      console.log(i)
      if(this.heartId.includes(id)===false) {
        axios.get('/product/' + id)
          .then((resp) => {
            if (resp) {
              this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
              this.heartId = JSON.parse(localStorage.getItem('heartId')) || []
              this.hearts.push(resp.data)
              this.heartId.push(resp.data.id)

              localStorage.setItem('hearts', JSON.stringify([...this.hearts]))
              localStorage.setItem('heartId', JSON.stringify([...this.heartId]))
            } else {
              console.log('this reviews not found')
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        console.log('error')
      }
    },
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
  padding:60px;
}
.active {
  color:red;
  /*font-weight:bold;*/
}
.icon:active{
  background: red;
}
.is-red{
  color: red;
}
.is-blue{
  color: blue;
}
</style>
