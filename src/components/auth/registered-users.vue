<template>
  <div class="user-box">
    <h3>All Users</h3>
      <b-table
        :fields="fields"
        class="p-5 m-auto"
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
  padding: 80px ;
  text-align: center;
  width: 100%;
}
</style>
