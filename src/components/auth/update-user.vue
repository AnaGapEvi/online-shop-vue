<template>
  <div class="update">
    <div className="Update profile">
      <h3> Type your Email to reset password </h3>
      <validation-observer ref="observer">

      <b-form v-on:submit.prevent="update_user" method="post">
        <validation
          name="first_name"
          rules="required"
        >
        <b-form-group
          id="input-group-1"
          label="First name:"
          label-for="input-1"
          description=""
          :value="user.first_name"
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-1"
            v-model="form.first_name"
            type="text"
            placeholder="first name..."
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
        </validation>
        <validation
          name="last_name"
          rules="required"
        >
        <b-form-group
          id="input-group-2"
          label="Last name:"
          label-for="input-1"
          description=""
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-3"
            v-model="form.last_name"
            type="text"
            placeholder="last name"
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
        </validation>
        <validation
          name="email"
          rules="required|email"
        >
        <b-form-group
          id="input-group-3"
          label="Email address:"
          label-for="input-1"
          description=""
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-3"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
        </validation>
        <validation
          name="password"
          rules="required|min:6"
        >
        <b-form-group
          id="input-group-4"
          label="Password:"
          label-for="input-4"
          description=""
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-1"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
        </validation>
        <validation
          name="password"
          rules="required|min|6"
        >
        <b-form-group
          id="input-group-4"
          label="Password:"
          label-for="input-4"
          description=""
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-1"
            v-model="form.repeatPassword"
            type="password"
            placeholder="Repeat password"
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
        </validation>
        <validation
          name="birthday"
          rules="required"
        >
        <b-form-group
          id="input-group-5"
          label="Date of birthday:"
          label-for="input-5"
          description=""
          slot-scope="{ errors }"
          :invalid-feedback="errors[0]"
        >
          <b-form-input
            id="input-5"
            v-model="form.birthday"
            type="date"
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
        </validation>
        <validation
          name="gender"
          rules="required"
        >
        <b-form-group label="Gender">
          <b-form-radio v-model="form.gender" name="gender" value="Male">Male</b-form-radio>
          <b-form-radio v-model="form.gender" name="gender" value="Female">Female</b-form-radio>
        </b-form-group>
        </validation>
        <b-button type="submit" variant="outline-primary">Update</b-button>
      </b-form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        repeatPassword: '',
        gender: '',
        birthday: ''
      },
      user:[],
      errors:[]
    }
  },
  mounted() {
    if(localStorage.getItem('token')){
      this.getMy()
    }
  },
  methods: {
    getMy(){
      return new Promise((resolve, reject) => {
        axios.get('/me')
          .then(result => {
            this.user = result.data.user
            resolve(true)
          }).catch(error => {
          reject(error)
        })
      })
    },
    update_user() {
      if (this.form.password === this.form.repeatPassword) {
        axios.put('/update-profile', this.form)
          .then((resp) => {
            resp.data
            this.$router.push({name: "MyProfile"})
          })
          .catch((e) => {
              return e
            }
          )
      } else {
        alert('password does not match')
      }
    }
  }
}
</script>
<style scoped>
.update{
  display: flex;
  justify-content: center;
  background-color: #698d94;
  height: 100vh;
  align-items: flex-start;
  padding: 80px;
}
</style>
