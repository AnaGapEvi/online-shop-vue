<template>
  <div class="product" style="padding: 50px">
    <div >
      <b-card no-body class="overflow-hidden" style="max-width: 50rem;">
        <b-row no-gutters>
          <a @click="back()" style="display: flex; justify-content: flex-end"><b-icon icon="x" scale="2" variant="dark" ></b-icon></a>
          <b-col md="6">
            <button style="border: none; background-color: white; position: absolute"  @click="addHeart(product.id)">
              <b-icon icon="heart" :style="isClicked ? { 'color': 'red' } : null" @click="toggleIsClicked(product.id)">
                >   </b-icon>
            </button>

            <button style="border: none; background-color: white; position: absolute; margin-left: 35px" @click="addLike(product.id)">
              <b-icon  icon="hand-thumbs-up" :style="isClicked2 ? { 'color': 'red' } : null" @click="changeColor(product.id)"
              ></b-icon>
            </button>
            <img :src="`https://damp-taiga-05096.herokuapp.com/${product.image}`"  class="shadow-lg p-3 bg-white rounded" height="300px" width="300px" >
          </b-col>
          <b-col md="6">
            <b-card-body title="Horizontal Card">
              <b-card-text> {{product.name}} </b-card-text>
              <b-card-text>Description:
                {{product.description}}
              </b-card-text>

              <b-card-text> Price:<b> {{product.price}} USD</b></b-card-text>
              <b-card-text> Likes:<b> {{product.likes}} </b></b-card-text>
              <b-button variant="outline-primary" v-if="token===''" to="/login">Buy</b-button>
              <b-button variant="outline-primary" v-if="token!==''" :to="{ name: 'ShoppingInformation', params: { price: product.price }}">Buy</b-button>
              <b-button  @click="add(product.id)"  variant="primary"> Add to cart</b-button>

              <b-button v-if="role==='admin'" @click="deleteProduct(product.id)"  variant="danger"> Delete</b-button>
              <router-link v-if="role==='admin'" :to=" {path: '/edit-product/'+product.id}"><b-button variant="info"> Edit</b-button></router-link>
              <div class="mt-3">
                <b-form  v-on:submit.prevent="formSubmit" method="post">
                  <div style="width: 100%" >
                    <b-form-rating v-model="rate.value" ></b-form-rating>
                    <div v-if="rate.value>0">
                      <p class="mt-2" v-bind="rate.value">Star: {{ rate.value }}</p>
                      <textarea  style="width: 100%" v-model="rate.comment"> </textarea>
                      <b-button  type="submit" variant="primary" >Review</b-button>
                    </div>
                    <span v-if="error!==''">{{error}}</span>

                  </div>
                </b-form>
              </div>

            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div  style="width: 100%">
      <div class="mt-3 bg-light"   style="width: 50rem; padding: 0; " v-for="review in reviews">
        <div>
           <p>NAME: {{review.user.first_name}} </p>
           <p>Comment: {{review.comment}} </p>
          <b-form-rating v-model="review.stars" variant="primary" readonly></b-form-rating>
          <b-button v-if="review.user_id===id" @click="deleteReview(review.id)"  variant="danger"> Delete</b-button>
          <b-button v-if="review.user_id===id" @click="openModal(review.id)">Edit</b-button>
        </div>
        <hr>
        <div class="col-sm-2">
          <div class="rating-stars">
              <span v-for="iteration in 5" :class="{'far fa-star':iteration<(parseInt(review.stars)+1)}">
                 <i class="fas fa-star"></i>
              </span>
          </div>
        </div>

      </div>
    </div>
    <b-modal id="modal-1" title="Update review">
          <input type="text" v-model="selectedReview.comment" >
          <b-form-rating v-model="selectedReview.stars" variant="primary"></b-form-rating>
          <b-button @click="editReview(selectedReview.id)">edit</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product:[],
      reviews:[],
      rate: {
        value:  null,
        comment: '',
        product_id: this.$route.params.id,
      },
      cart:{
        quantity:1,
        product_id:null
      },
      count:'',
      isClicked: false,
      isClicked2: false,
      token:'',
      role:'',
      id:'',
      rev_id:'',
      error:'',
      selectedReview: {},
      rev:null,
      heartId:'',
      hearts:[],
      likes:[],
      like:''
    }
  },
  computed:{
    // this.addLike();
  },
  mounted() {
    this.getProduct()
    this.getReviews()
    this.getMy()
    if(localStorage.getItem('access_token')){
      this.token=localStorage.getItem('access_token')
    }
    console.log(this.reviews)

      if(localStorage.getItem('access_token')){
        this.token=localStorage.getItem('access_token')
      }
      this.my = localStorage.getItem('access_token')
      this.likes = JSON.parse(localStorage.getItem('likes')) ||[]
      this.hearts = JSON.parse(localStorage.getItem('hearts')) || []
      this.heartId = JSON.parse(localStorage.getItem('heartId')) || []

  },
  methods:{
    back(){
      window.history.go(-1)
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
            window.location.reload()
            // this.count =''
          })
          .catch((e) =>{
            console.log(e)
          })
      } else{
        // this.isClicked2 =true
        console.log('error')
      }

    },
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {
            this.role = result.data.user.role
            this.id = result.data.user.id
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    deleteProduct(id){
      axios.delete('/delete-product/'+id,)
        .then((resp)=> {
          if(resp){
            this.$router.push({name: "Products"})
          } else {
            console.log('this reviews not found')
          }
        })
    },
    getProduct(){
      return new Promise((resolve, reject) => {
        axios.get('product/'+ this.$route.params.id).then((res) => {
          this.product = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    getReviews(){
      return new Promise((resolve, reject) => {
        axios.get('reviews/'+ this.$route.params.id).then((res) => {
          this.reviews = res.data
          console.log(this.reviews)
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    deleteReview(id){
      axios.delete('/delete-review/'+id)
        .then((resp)=> {
          if(resp){
            window.location.reload()
            // this.$router.push({name: "Home"})
          } else {
            console.log('this reviews not found')
          }
        })
    },
    editReview(id){
      console.log(id,this.selectedReview);
      axios.put('/update-review/'+id, this.selectedReview)
        .then((resp)=> {
          if(resp){
            console.log(resp.data)

            // this.reviews = resp.data
            // console.log(this.reviews)
          } else {
            console.log('this reviews not found')
          }
        })
    },
    openModal(id) {
      console.log(id)
      this.rev = this.reviews.filter((e)=>e.id === id )
      this.selectedReview = this.rev[0]
      console.log(this.selectedReview)
      this.$bvModal.show("modal-1");
    },
    formSubmit(){
      axios.post('/new-review', this.rate)
        .then((resp)=> {
          if(resp){
            this.products=this.reviews
            window.location.reload()
          }
          else {
            console.log('this reviews not found')
          }
        }).catch((e) =>{
          if(!localStorage.getItem("access_token") ){
              this.error='Go to login or registration'
          }else{
            this.error='fill in all fields'
            console.log(e)

          }
          // window.location.reload()
        })
    },
    add(id){
      this.cart.product_id= id
      axios.post('/add-card', this.cart)
        .then((resp)=> {
          if(resp){
            return resp.data
            // this.$router.push({name: "Home"})
          } else {
            console.log('this reviews not found')
          }
        })
        .catch((e) =>{
          // return e
          this.$router.push({name: "Login"})
        })
    },
  }
}
</script>

<style scoped>
.product{
  /*display: flex;*/

  /*width: 100%;*/
  /*height: 100vh;*/
  background-color: #343a40;
  min-height: 100vh;
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*color: white;*/
}
</style>
