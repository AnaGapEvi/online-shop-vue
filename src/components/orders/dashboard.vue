<template>
  <div class="dashboard">
      <div class="list">
        <nav-bar class="navbar" ></nav-bar>

        <b-card-group deck class="d-flex flex-wrap w-80 h-25  p-3 m-3" >
            <b-card bg-variant="primary" text-variant="white" header="TOTAL ORDERS" class="m-3 text-center" >
              <router-link to="/total-order" style="color: black; text-decoration: none">
                <b-card-text s>view details</b-card-text>
              </router-link>
            </b-card>
            <b-card bg-variant="danger" text-variant="white" header="NEW ORDERS" class="text-center m-3">
              <router-link to="/new-order" style="color: black; text-decoration: none">
                <b-card-text >view details</b-card-text>
              </router-link>
            </b-card>
            <b-card bg-variant="success" text-variant="white" header="DELIVERED ORDERS" class="text-center m-3">
              <router-link to="/delivered-order" style="color: black; text-decoration: none">
                <b-card-text >view details</b-card-text>
              </router-link>
            </b-card>
            <b-card bg-variant="info" text-variant="white" header="REGISTERED USERS" class="text-center m-3" >
              <router-link to="/registered-users" style="color: black; text-decoration: none">
                <b-card-text >view details</b-card-text>
              </router-link>
            </b-card>
            <b-card bg-variant="danger" text-variant="white" header="CANCELLED ORDERS" class="text-center m-3" >
              <router-link  to="/cancelled-order" style="color: black; text-decoration: none">
                <b-card-text variant="white" >view details</b-card-text>
              </router-link>
            </b-card>
        </b-card-group>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.list{
  display: flex;
}
.navbar{
  width: 25%;
  height: 100vh;
}
.dashboard{
  padding-top: 50px;
}
</style>
