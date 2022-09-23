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
        <p>
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
      // currentHeart: this.mode,
      // currentLike: this.mode,
      perPage: 10,
      currentPage: 1,
      products:[],
      originalProducts: [],
      productSearch: '',
      // modalShow: false,
      token:'',
      // rate: {
      //   value:  null,
      //   comment: '',
      //   product_id: ''
      // },
      card:{
        quantity:1,
        product_id:null
      },
      my:'',
      error:'',
      likes:[1],
      hearts:[],
      heartId:[],
      // cart:{},
      page: 1,
      isLoading: true,
      // className:'',
      // moveToDown:false,
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
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
    if (localStorage.getItem('page')){
      this.page=localStorage.getItem('page')
    }
  },
  mounted() {
    this.currentPage= localStorage.getItem('page')

    this.my = localStorage.getItem('access_token')
    this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
    this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
    this.heartId = JSON.parse(localStorage.getItem('heartId')) || []
  },
  methods: {
    changeColor(){
      this.isLoading = !this.isLoading;
    },
    searchProducts()
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
  }
}
</script>

<style scoped>

.home{
  background-image: url("https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg");
  min-height: 100vh;
  padding:60px;
}
</style>
