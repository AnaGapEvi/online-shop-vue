<template>
  <div class="product">
    <div>
      <b-card no-body class="overflow-hidden" style="max-width: 50rem;">
        <b-row no-gutters>
          <a @click="back()" style="display: flex; justify-content: flex-end"><b-icon icon="x" scale="2" variant="dark" ></b-icon></a>
          <b-col md="6">
            <button style="border: none; background-color: white; position: absolute"  @click="addHeart(product.id)">
              <b-icon icon="heart" :style="isClicked ? { 'color': 'red' } : null">   </b-icon>
            </button>

            <button style="border: none; background-color: white; position: absolute; margin-left: 35px" @click="addLike(product.id)">
              <b-icon  icon="hand-thumbs-up" :style="isClicked2 ? { 'color': 'red' } : null"></b-icon>
            </button>
            <img :src="`https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80`"  class="shadow-lg p-3 bg-white rounded" height="300px" width="300px" >
<!--            <img :src="`https://damp-taiga-05096.herokuapp.com/${product.image}`"  class="shadow-lg p-3 bg-white rounded" height="300px" width="300px" >-->
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
      <div class="mt-3"   style="color: white; width: 50rem; padding: 0; " v-for="review in reviews" :key="review.id">
        <div>
           <p>NAME: {{review.user.first_name}} </p>
           <p>Comment: {{review.comment}} </p>
          <b-form-rating v-model="review.stars" variant="primary" readonly></b-form-rating>
          <b-button class="mt-3" v-if="review.user_id===id" @click="deleteReview(review.id)"  variant="danger"> Delete</b-button>
          <b-button class="mt-3" v-if="review.user_id===id" @click="openModal(review.id)">Edit</b-button>
        </div>
        <hr>
        <div class="col-sm-2">
          <div>
              <span v-for="iteration in 5" :key="iteration" :class="{'far fa-star':iteration<(parseInt(review.stars)+1)}">
                 <i class="fas fa-star"></i>
              </span>
          </div>
        </div>

      </div>
    </div>
    <b-modal id="modal-1" title="Update review">
          <input type="text" class="rating-stars" v-model="selectedReview.comment" >
          <b-form-rating v-model="selectedReview.stars" variant="primary"></b-form-rating>
          <b-button class="batn" @click="editReview(selectedReview.id)"> UPDATE
          </b-button>
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
      like:'',
      isAuth:false
    }
  },
  mounted() {
    console.log(this.$isAuth);
    this.getProduct()
    this.getReviews()
    this.getMy()
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
    if(this.likes !== null){
      this.likes.forEach(e=> {
        if (e===this.product.id){
          this.changeLike(this.product.id)
        }
      })
    }

    if(this.heartId !== null){
      this.heartId.forEach(e=> {
        if (e===this.product.id){
          this.changeHeart(this.product.id)
        }
      })
    }
  },
  methods:{
    back(){
      window.history.go(-1)
    },
    toggleIsClicked(id) {
      this.isClicked = !this.isClicked
      if(this.isClicked===false){
        this.likes = this.likes.filter((e)=>e.id !== id )
      }
    },
    changeHeart(id) {
      this.isClicked = !this.isClicked
      if(this.isClicked===false){
        this.hearts = this.hearts.filter((e)=>e !== id )
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
            this.count = resp.data.likes
            localStorage.setItem('likes', JSON.stringify([...this.likes]))
          })
          .catch((e) =>{
            console.log(e)
          })
      }
    },
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {

            this.isAuth=true
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
            this.getReviews()
          } else {
            this.error = 'this reviews not found'
          }
        })
    },
    editReview(id){
      axios.put('/update-review/'+id, this.selectedReview)
        .then((resp)=> {
          if(resp){
              this.reviews = resp.data
          } else {
            console.log('this reviews not found')
          }
        })
    },
    openModal(id) {
      this.rev = this.reviews.filter((e)=>e.id === id )
      this.selectedReview = this.rev[0]
      this.$bvModal.show("modal-1");
    },
    formSubmit(){
      axios.post('/new-review', this.rate)
        .then((resp)=> {
          if(resp){
            this.products=this.reviews
            this.rate.comment=''
            this.rate.value=null

            this.getReviews()
          }
          else {
            console.log('this reviews not found')
          }
        }).catch((error) =>{
          if(!localStorage.getItem("access_token") ){
              this.error='Go to login or registration'
          } else if(this.rate.comment==='' && this.rate.value===''){
              this.error='fill in all fields'
          }
          else{
            this.error ='you have a comment'
          }
        })
    },
    add(id){
      this.cart.product_id= id
      axios.post('/add-card', this.cart)
        .then((resp)=> {
          if(resp){
            return resp.data
          } else {
            this.error='this reviews not found'
          }
        })
        .catch((error) =>{
          if(error) this.$router.push({name: "Login"})
        })
    },
  }
}
</script>

<style scoped>
.rating-stars{
  /*background: #e55757;*/
  width: 100%;
  padding: 5px ;
  margin-bottom: 5px;
  border-radius: 5px;
  border: rgba(163, 170, 178, 0.63) 1px solid;
}
.product{
  background-color: #343a40;
  min-height: 100vh;
  padding: 70px;
}
.batn{
  margin-top: 5px;
  background-color: orange;
  border: none;
  width: 100%;
}
</style>
