<template>
  <div class="category" >
<!--    <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">-->

    <b-card style="max-width: 15rem;min-width: 15rem" class="w-20 m-3"  v-for="product in products" :kay="product.id"
                :value="product.id"
                :key="product.id"
        >
      <product-item :product="product"></product-item>
      </b-card>
  </div>
</template>

<script>
import axios from "axios";
import ProductItem from "../ProductItem";
export default {
  components: {ProductItem},
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
      hearts:[],
      heartId:'',
      // hearts:[],
      likes:[],
      like:'',
      // count:'',
      isClicked: false,
      isClicked2: false,
      router: this.$route.params.id
    }
  },
  watch: {
    categoryId(newValue, old){
      this.getProduct()
    }
  },
  computed: {
    rows() {
      return this.products.length
    },
    total(){
        let num=0
        num = this.count
        this.count=''
        return num
    },
    categoryId () {
      return this.$route.params.id
    }
  },

  created() {
    this.getProduct()
  },
  mounted() {
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }

    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
    this.my = localStorage.getItem('access_token')
    this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
    this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
    this.heartId = JSON.parse(localStorage.getItem('heartId')) || []

  },
  methods: {
    getProduct() {
      console.log(this.categoryId)
       axios.get('/categories-product/' + this.categoryId).then(response => {
          this.products = response.data
        })
    },
    formSubmit(){
      axios.post('/new-review', this.rate)
        .then((resp)=> {
          if(resp){
            // this.$router.push({name: "Home"})
          } else {
            this.error='this reviews not found'
          }
        })
        .catch((e) =>{
          this.error=e.response.data.message
        })
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
    add(id){
      this.card.product_id=id
      axios.post('/add-card', this.card)
        .then((resp)=> {
          if(resp){
            return resp.data
            // this.$router.push({name: "Home"})
          } else {
            this.error='this reviews not found'
          }
        })
        .catch(error =>{
          this.$router.push({name: "Login"})
        })
    },
    toggleIsClicked(id) {
      this.isClicked = !this.isClicked
      if(this.isClicked===false){
        this.likes = this.likes.filter((e)=>e.id !== id )
      }
    },
    changeColor(){
      this.isClicked2 = !this.isClicked2
    },
    addHeart(id){
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
              this.error='this reviews not found'
            }
          })
          .catch((e) => {
            this.error=e.response.data.message
          })
      } else {
        this.error='error'
      }
    },
    addLike(id){
      if(this.likes.includes(id)===false){
        axios.get('/like-product/'+id)
          .then((resp)=> {
            this.likes=JSON.parse(localStorage.getItem('likes')) || []
            this.likes.push(resp.data.id)
            this.count = resp.data.likes
            localStorage.setItem('likes', JSON.stringify([...this.likes]))
          })
          .catch((e) =>{
           this.error =e.response.data.message
          })
      } else{
        this.error =e.response.data.message
      }

    },
  }
}
</script>

<style scoped>

.category{
  background-image: url("https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg");
  min-height: 100vh;
  padding:70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
