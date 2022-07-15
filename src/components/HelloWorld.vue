<template>
  <div class="home">

      <router-link :to="{name: 'HelloWorld', params: {page: page}}">Go to Shop</router-link>

  </div>
</template>

<script>
import NavHome from "./custom/NavHome";
export default {
  name: 'HelloWorld',
  components: {NavHome},
  data(){
    return {
      page: 1,
      count:0,
      categories: [],
    }
  },
  mounted() {
    this.page = localStorage.getItem('page') || 1
  }

}
</script>

<style scoped>

h1{
  padding-top: 150px;
  margin-left: 250px;
  color: white;
  font-family: "Ani" ;
}
.home{
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-size: cover;
  background-repeat:no-repeat;
}
</style>
