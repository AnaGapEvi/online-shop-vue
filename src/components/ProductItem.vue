<template>
  <div style="max-width: 100%">
    <button style="border: none; background-color: white"  @click="addHeart(productItem.id)">
      <b-icon icon="heart" :style="isClicked ? { 'color': 'red' } : null" @click="toggleIsClicked(productItem.id)">
        >   </b-icon>
    </button>

    <button style="border: none; background-color: white" @click="addLike(productItem.id)">
      <b-icon  icon="hand-thumbs-up" :style="isClicked2 ? { 'color': 'red' } : null" @click="changeColor(productItem.id)"
      ></b-icon>
    </button>
    <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+productItem.id}">
      <img :src="`https://damp-taiga-05096.herokuapp.com/${productItem.image}`" height="200px" width="200px">

      {{productItem.name }}
      <hr>
      <p>Price <b>{{productItem.price}}$</b>  </p>
      <p>Liked <b>{{total}}</b>  </p>
    </router-link>
    <p> <router-link style="color: black"  :to=" {path: '/one-product/'+productItem.id}">Reviews</router-link></p>
    <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
    <b-button variant="outline-primary" v-if="token!==''"  :to="{ name: 'ShoppingInformation', params: { price: productItem.price }}">Buy</b-button>
    <b-button @click="add(productItem.id)"  variant="primary" @keydown="modalShow = !modalShow"> Add to cart</b-button>
    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['product'],
  components: {},
  data() {
    return {
      productItem: this.product,
      isLoading:'',
      isClicked: false,
      isClicked2: false,
      token:'',
      likes:[],
      hearts:[],
      modalShow: false,
      heartId:[],
      card:{
        quantity:1,
        product_id:null
      },
      count:''
    }
  },
  computed: {
    total(){
      let num=0
      num = this.count
      this.count=''
      return num
    }

  },
  mounted() {
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
    this.my = localStorage.getItem('access_token')
    this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
    this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
    this.heartId = JSON.parse(localStorage.getItem('heartId')) || []
  },
  methods: {
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
    toggleIsClicked: function (id) {
      this.isClicked = !this.isClicked
      if(this.isClicked===false){
        this.likes = this.likes.filter((e)=>e.id !== id )
      }
    },
    changeColor(){
      this.isClicked2 = !this.isClicked2
    },
    addHeart(id){
      // this.currentHeart  === 'grid' ? this.currentHeart  = '' : this.currentHeart  = 'grid'
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
    addLike(id){
      if(this.likes.includes(id)===false){
        axios.get('/like-product/'+id)
          .then((resp)=> {
            this.likes=JSON.parse(localStorage.getItem('likes')) || []
            this.likes.push(resp.data.id)
            this.count = resp.data.likes
            localStorage.setItem('likes', JSON.stringify([...this.likes]))
            // window.location.reload()
            // this.count =''
          })
          .catch((e) =>{
            console.log(e)
          })
      } else{
        // this.isClicked2 =true
        console.log('error')
      }

    }
  }
}
</script>

<style scoped>
div {
  margin: 3px;
  text-align: center;
}
</style>
