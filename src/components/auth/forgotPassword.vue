<template>
  <div class="body">
    <b-container class="px-0 mt-5 forgot">
      <b-row>
        <b-col cols="5" md="8" lg="7" xl="5" class="mx-auto" >
          <h3> Type your Email to reset password  </h3>
            <b-form @submit.prevent="reset">
              <b-form-group label-class="form-label" label="Email Address" label-for="email" >
                  <b-form-input id="email"  placeholder="...." v-model="user.email" trim />
                </b-form-group>
              <b-form-group label-class="form-label" label="Password" label-for="password" >
                <b-form-input id="password" type="password"  placeholder="...." v-model="user.password" trim />
              </b-form-group>
              <b-form-group label-class="form-label" label="Repeat password" label-for="repeatPassword" >
                <b-form-input id="password" type="password"  placeholder="...." v-model="user.repeat" trim />
              </b-form-group>
              <div class="mt-3">
                <b-button variant="primary" block type="submit" > Reset </b-button>
              </div>
              <div>
                <router-link to="/sign-up" class="d-block small mt-3">Register an Account</router-link>
                <router-link to="/login" class="d-block small" >Login page</router-link>
              </div>
            </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user:{
        email: "",
        password:"",
        repeat:""
      }
    }
  },
  methods: {
    reset() {
      if(this.user.password===this.user.repeat){
        axios.put('/forgot', this.user)
          .then((resp) => {
            if(resp){
              this.$router.push({name: "Login"});
              console.log(resp.data)
            } else {
              console.log('you not have a account')
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else{
        alert('passwor!!!!!')
      }
    }
  }
}
</script>
<style scoped>
.body{
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #343a40;
  justify-content: center;
  align-items: center;
  color: white;
}
.forgot{

  justify-content: center;
  align-items: center;
}
</style>
