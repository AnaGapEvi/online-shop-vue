<template>
  <div class="prod">
    <h3>New Book</h3>
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
            v-model="name"
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
            v-model="description"
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
            v-model="price"
            type="number"
            placeholder="price..."
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
          label="Qty:"
          label-for="input-1"
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-1"
            v-model="quantity"
            type="number"
            placeholder="qty..."
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
          label="Image:"
          label-for="input-1"
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <input type="file" name="image" @change="onImageChange" :state="errors[0] ? false : null">
        </b-form-group>
      </validation>
      <validation
        name="book_name"
        rules="required"
      >
        <b-form-group
          id="input-group-1"
          label="Category:"
          label-for="input-1"
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
        <select style="padding: 6px" v-model="category_id">
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
  name: 'New-Product',
  data () {
    return {
      name:'',
      description:'',
      price:'',
      quantity:'',
      image:null,
      category_id: null,
      categories:[]
    }
  },
  created() {
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
    onImageChange(e){
      this.image = e.target.files[0];
      console.log(this.image)
    },

    formSubmit(e) {
      e.preventDefault();
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('price', this.price)
      formData.append('quantity', this.quantity)
      formData.append('category_id', this.category_id)
      for (let value of formData.values()) {
        console.log(value);
      }
      axios.post('/new-product', formData, config)
        .then((response) => {
          if(response){
            this.$router.push({name: "HelloWorld"})

          }
        }).catch( error => {
        return error;
      });
    }
  }
}
</script>


<style scoped>
.prod{
  background-color: #698d94;

  color: black;
  width: 500px;
  margin: 0 auto;
  padding: 70px;
  /*background-color: rgba(154, 215, 215, 0.87);*/
  border-radius: 20px;
}
</style>
