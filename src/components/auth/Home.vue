<template>
  <div>
    <nav-bar class="w-20"></nav-bar>
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
          this.categories = res.data
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
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },

  }
}
</script>

<style scoped>
router-link{
  color: white;
  text-decoration: none;
}
</style>
