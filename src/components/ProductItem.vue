<template>
  <div style="max-width: 100%">
    <button style="border: none; background-color: white; margin-right: 125px"  @click="addHeart(productItem.id)">
      <b-icon icon="heart" :style="isClicked ? { 'color': 'red' } : null" >
        >   </b-icon>
    </button>

    <button style="border: none; background-color: white" @click="addLike(productItem.id)">
      <b-icon  icon="hand-thumbs-up" :style="isClicked2 ? { 'color': 'red' } : null"
      ></b-icon>
    </button>
    <router-link style="color: black; text-decoration: none" :to=" {path: '/one-product/'+productItem.id}">
      <img :src="`https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80`" height="200px" width="200px">
<!--      <img :src="`https://damp-taiga-05096.herokuapp.com/${productItem.image}`" height="200px" width="200px">-->
      {{productItem.name }}
      <hr>
      <p>Price <b style="color: green">{{productItem.price}}$</b>  </p>
      <div style="display: flex; justify-content: space-between">
        <p>Reviews <router-link style="color: black"  :to=" {path: '/one-product/'+productItem.id}"></router-link></p>
        <p v-if="total">Liked: <b>{{ total}}</b>  </p>

        <p v-else>Liked: <b>      {{productItem.likes  }}      </b>  </p>
      </div>
    </router-link>
    <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
    <b-button variant="outline-primary" v-if="token!==''"  :to="{ name: 'ShoppingInformation', params: { price: productItem.price }}">Buy</b-button>
    <b-button @click="add(productItem.id)"  variant="outline-primary" @keydown="modalShow = !modalShow"> Add to cart</b-button>
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
      count:'',
      liked:'',
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
    this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
    this.my = localStorage.getItem('access_token')
    this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
    this.heartId = JSON.parse(localStorage.getItem('heartId')) || []

    if(this.likes !== null){
      this.likes.forEach(e=> {
        if (e===this.productItem.id){
          this.changeLike(this.productItem.id)
        }
      })
    }

    if(this.heartId !== null){
      this.heartId.forEach(e=> {
        if (e===this.productItem.id){
          this.changeHeart(this.productItem.id)
        }
      })
    }
  },

  methods: {
    add(id){
      this.card.product_id = id
      axios.post('/add-card', this.card)
        .then((resp)=> {
          if(resp){
            return resp.data
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
          this.$router.push({name: "Login"})
        })
    },
    changeHeart: function (id) {
      this.isClicked = !this.isClicked

      if(this.isClicked===false){
        this.hearts = this.hearts.filter((e)=>e !== id )
        // this.hearts = JSON.parse(localStorage.getItem('hearts'))
        // localStorage.setItem('hearts', JSON.stringify(this.hearts))
        // this.heartId = this.heartId.filter((e)=>e !== id )
        // localStorage.setItem('heartId', JSON.stringify(this.heartId))

        // localStorage.setItem('likes', this.likes)
      }
    },

    changeLike(id){
      this.isClicked2 = !this.isClicked2
      if(this.isClicked2===false){
        this.likes = this.likes.filter((e)=>e.id !== id )
        localStorage.setItem('likes', JSON.stringify(this.likes))

      }
    },

    addHeart(id){
      if(this.heartId.includes(id)===false) {
        this.changeHeart(id)
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
        this.heartId = JSON.parse(localStorage.getItem('heartId')) || []
        this.hearts = JSON.parse(localStorage.getItem('hearts')) || []

        this.heartId = this.heartId.filter(e => e !== id)
        this.hearts = this.hearts.filter(e => e.id !== id)
        this.changeHeart(id)
        localStorage.setItem('heartId', JSON.stringify([...this.heartId]))
        localStorage.setItem('hearts', JSON.stringify([...this.hearts]))

      }
    },
    addLike(id){
      if(!this.likes.includes(id)){
        this.changeLike(id)
        axios.get('/like-product/'+id)
          .then((resp)=> {
            this.likes=JSON.parse(localStorage.getItem('likes')) || []
            this.likes.push(resp.data.id)
            this.count = resp.data.likes
            localStorage.setItem('likes', JSON.stringify([...this.likes]))
          })
          .catch((e) =>{
            console.log(e)
          })
      } else{

        axios.get('/like-product-diz/'+id)
          .then((resp)=> {
            this.likes=JSON.parse(localStorage.getItem('likes')) || []
            this.likes = this.likes.filter(e => e !== id)
            this.changeLike(id)
            // this.likes.push(resp.data.id)
            this.count = resp.data.likes
            localStorage.setItem('likes', JSON.stringify([...this.likes]))
            // console.log(JSON.parse(localStorage.getItem('likes')));
          })
          .catch((e) =>{
            console.log(e)
          })

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
