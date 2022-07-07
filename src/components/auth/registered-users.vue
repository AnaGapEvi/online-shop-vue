<template>
  <div class="user-box">
    <h1>All Users</h1>
      <b-table
        :fields="fields"
        class="p-5"
        id="my-table"
        :items="users"
      ></b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      fields: ['id', 'first_name', 'last_name','role', 'created_at'],

      users:[]
    }
  },
  created() {
    this.getUser()
    console.log(this.users)
  },
  methods: {
    getUser() {
      return new Promise((resolve, reject) => {
        axios.get('users').then((res) => {
          this.users = res.data
          return resolve(true);
        }).catch((error) => {
          return reject(error)
        })
      })
    }
  }
}
</script>

<style scoped>
.user-box{
  width: 80%;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
}
.user-card{
  border: 2px solid black;
  margin: 2px 15px;
  padding: 2px;
}
</style>
