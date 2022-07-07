<template>
  <div class="prod">
    <h3>New Book</h3>
    <b-form  @submit.prevent="formSubmit" enctype="multipart/form-data">
      <label>Book name:
        <b-input type="text" name="name" v-model="name"></b-input>
      </label>
      <label>Description:
        <b-textarea  name="description" id="" cols="23" rows="3" v-model="description"></b-textarea>
      </label>
      <labeL>Price:
        <b-input type="number" name="price" v-model="price"></b-input>
      </labeL>
      <label> Quantity:
        <b-input type="number" name="quantity" v-model="quantity"></b-input>
      </label>
      <label>Image:
        <input type="file" name="image" @change="onImageChange">
      </label>
      <label>
        <select style="padding: 6px" v-model="category_id">
          <option> Categories</option>
          <option v-for="category in categories" :key="category.id " v-bind:value="category.id">
             {{category.name}}
          </option>
        </select>
      </label>

      <b-button type="submit">add product</b-button>

    </b-form>
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
            this.$router.push({name: "Products"})

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
  margin: 50px auto;
  padding: 30px;
  /*background-color: rgba(154, 215, 215, 0.87);*/
  border-radius: 20px;
}
</style>
