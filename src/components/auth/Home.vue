<template>
  <div>
    <nav-bar class="w-25"></nav-bar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      data: {},
      categories: [],

    }
  },
  created() {
    this.getMy()
    this.getCategories()
  },
  methods: {
    getCategories() {
      return new Promise((resolve, reject) => {
        axios.get('categories').then((res) => {
          console.log(res)
          this.categories = res.data
          console.log(this.categories)
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {
            this.data = result.data.user
            console.log(this.data)
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    logout(){
      axios.get('/logout').then(result => {
        localStorage.removeItem('access_token');
        // this.$router.push({name: "HelloWorld"});
        window.location.reload()
      }).catch(error => {
        return error
      })
    },

  }
}
</script>

<style scoped>
.nav{
  /*display: flex;*/
  /*align-items: flex-start;*/
  color: white;
  width: 100%;
}
router-link{
  color: white;
  text-decoration: none;
}
</style>
