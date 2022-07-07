<template>
  <div class="home">

      <div class="d-flex justify-content-between mt-3" >
      </div>
    <div class="d-flex justify-content-evenly mt-3">

    </div>
  </div>
</template>

<script>
import NavHome from "./custom/NavHome";
export default {
  name: 'HelloWorld',
  components: {NavHome},
  data(){
    return {
      count:0,
      categories: [],
    }
  },

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
