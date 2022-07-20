<template>
  <div id="app" >
    <nav-home class="position-fixed nav"></nav-home>
    <div class="components">
      <router-view />

    </div>

  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  /*height: 100vh;*/

}
.nav{
  z-index: 1;
}
.components{
  /*padding-top: 50px;*/
}
</style>
