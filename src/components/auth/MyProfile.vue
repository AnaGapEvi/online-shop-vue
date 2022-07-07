<template>
  <div class="profile">
    <b-card
      img-top
      tag="article"
      style="max-width: 40rem;min-width: 40rem;"
      class="mb-2"
    >
      <b-card-text><h3> {{data.first_name}}</h3></b-card-text>
      <b-card-text>{{data.last_name}}</b-card-text>
      <b-card-text>{{data.birthday}}</b-card-text>
      <b-card-text>{{data.email}}</b-card-text>

      <b-button to="/update-user-data" variant="primary">Edit Profile</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      data:{}
    }
  },

  created() {
    this.getMy()
  },
  methods: {
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
.profile{
  display: flex;
  justify-content: center;
  background-color: #698d94;
  height: 100vh;
  align-items: flex-start;
  padding: 80px;
}
</style>
