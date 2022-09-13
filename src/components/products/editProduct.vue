<template>
  <div class="prod">
    <h3>Update Book</h3>
    <validation-observer ref="observer">

      <b-form  @submit.prevent="formSubmit" enctype="multipart/form-data">
        <validation
          name="book_name"
          rules="required"
        >
          <b-form-group
            id="input-group-1"
            label="Book name:"
            label-for="input-1"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="input-1"
              v-model="product.name"
              type="text"
              placeholder="book name..."
              :state="errors[0] ? false : null"
              trim

            ></b-form-input>
          </b-form-group>
        </validation>
        <validation
          name="book_name"
          rules="required"
        >
          <b-form-group
            id="input-group-1"
            label="Description:"
            label-for="input-1"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="input-1"
              v-model="product.description"
              type="text"
              placeholder="description..."
              :state="errors[0] ? false : null"
              trim

            ></b-form-input>
          </b-form-group>
        </validation>
        <validation
          name="book_name"
          rules="required"
        >
          <b-form-group
            id="input-group-1"
            label="Price:"
            label-for="input-1"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="input-1"
              v-model="product.price"
              type="number"
              placeholder="price..."
              :state="errors[0] ? false : null"
              trim

            ></b-form-input>
          </b-form-group>
        </validation>
        <validation
          name="quantity"
          rules="required"
        >
          <b-form-group
            id="input-group-1"
            label="Qty:"
            label-for="input-1"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="input-1"
              v-model="product.quantity"
              type="number"
              placeholder="qty..."
              :state="errors[0] ? false : null"
              trim

            ></b-form-input>
          </b-form-group>
        </validation>

        <validation
          name="category"
          rules="required"
        >
          <b-form-group
            id="input-group-1"
            label="Category:"
            label-for="input-1"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <select style="padding: 6px" v-model="product.category_id">
              <option v-for="category in categories" :key="category.id " v-bind:value="category.id">
                {{category.name}}
              </option>
            </select>
          </b-form-group>
        </validation>
        <b-button type="submit">add product</b-button>

      </b-form>
    </validation-observer>
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
