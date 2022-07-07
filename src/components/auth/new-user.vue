<template>
  <div class="reg">
    <div class="Sign in">
      <h3> Type your Email to reset password  </h3>
      <validation-observer ref="observer">
      <b-form v-on:submit.prevent="create_user" method="post">
        <validation
          name="first_name"
          rules="required"
        >
          <b-form-group
            id="input-group-1"
            label="First name:"
            label-for="input-1"
            description=""
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
          rules="required|min:6"
        >
        <b-form-group
          id="input-group-4"
          label="Repeat Password:"
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
            :min="1900-12-31"
            :max="2011-12-31"
            :state="errors[0] ? false : null"
            trim
          ></b-form-input>
        </b-form-group>
            <input type="date" id="start" name="trip-start"
                   value="2018-07-22"
                   min="2018-01-01" max="2018-12-31">

          </validation>
          <validation
            name="gender"
            rules="required"
          >
            <b-form-group label="Gender" >
              <b-form-radio v-model="form.gender"   name="gender" value="Male">Male</b-form-radio>
              <b-form-radio v-model="form.gender"  name="gender" value="Female">Female</b-form-radio>
            </b-form-group>
          </validation>
        <b-button type="submit" variant="outline-primary">Sign in</b-button>
      </b-form>
      </validation-observer>
      <span v-if="errore!==''">{{errore}}</span>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SignUp',
  data () {
    return {
      form:{
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        repeatPassword:'',
        gender: '',
        birthday:''
      },
      errore:'',
      age:'',
      birthday:'',
      mount:'',
      year:'',
      day:''
    }
  },
  methods:{
  create_user(){

      if(this.form.password === this.form.repeatPassword){
        this.birthday = new Date(this.form.birthday);
        this.mount = Date.now() - this.birthday.getTime();
        this.age = new Date(this.mount);
        this.year = this.age.getUTCFullYear();
        this.day = Math.abs(this.year - 1970);
        if(this.form.birthday!=='' && this.day>10){
          axios.post('/register', this.form)
            .then((resp)=> {
              resp.data
              this.$router.push({name: "Login"})
            })
            .catch((e) =>{
                this.errore=e.response.data.message
              }
            )
        } else {
          this.errore='Your age does not qualify  for registration 10+'
        }

      } else {
        this.form.password = ""
        this.form.repeatPassword = ""
        modalShow('password does not match')
      }
    }

  }
}
</script>

<style scoped>
.reg{
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #343a40;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
