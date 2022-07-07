<template>
  <div class="prod">
    <h3>Update Book</h3>
    <b-form  @submit.prevent="formSubmit" enctype="multipart/form-data">
      <label>Book name:
        <b-input type="text" name="name" v-model="product.name"></b-input>
      </label>
      <label>Description:
        <b-textarea  name="description" id="" cols="23" rows="3" v-model="product.description"></b-textarea>
      </label>
      <labeL>Price:
        <b-input type="number" name="price" v-model="product.price"></b-input>
      </labeL>
      <label> Quantity:
        <b-input type="number" name="quantity" v-model="product.quantity"></b-input>
      </label>
<!--      <label>Image:-->
<!--        <input type="file" name="image" @change="onImageChange">-->
<!--      </label>-->
      <label>
        <select style="padding: 6px" v-model="product.category_id">
          <option> Categories</option>
          <option v-for="category in categories" :key="category.id " v-bind:value="category.id">
            {{category.name}}
          </option>
        </select>
      </label>

      <b-button type="submit">update</b-button>

    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {},
      categories:[],
      error:[]
    }
  },
  mounted() {
    this.getProduct()
    this.getCategories()
  },
  methods:{
    getCategories(){
      return new Promise((resolve, reject) =>{
        axios.get('categories').
        then((res)=>{
          this.categories=res.data
          return resolve(true);
        }).catch((error)=>{
          return reject(error)
        })
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
    onImageChange(e){
      this.image = e.target.files[0];
    },
    formSubmit(e) {
        axios.put('/edit-product/'+this.$route.params.id , this.product)

        .then((response) => {
            if(response){
              this.$router.push({name: "Products"})
            }
          }).catch( error => {
          this.error.push(error);
            return error;
        });
      }
  }
}
</script>

<style scoped>
.prod{
  color: white;
  width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-color: rgba(154, 215, 215, 0.87);
  border-radius: 20px;
}
</style>
