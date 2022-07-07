<template>
  <div>
    <b-container class="px-0 mt-5">
      <b-row>
        <b-col cols="5" md="8" lg="7" xl="5" class="mx-auto" >
          <h3>  Please Verify Your</h3>
            <b-form @submit.prevent="verify">
                <b-form-group label-class="form-label" label="Email Address" label-for="email">
                  <b-form-input id="email" v-model="formData.email"  trim />
                </b-form-group>
                <b-form-group  label-class="form-label"  label="Password"  label-for="password" >
                  <b-form-input  id="password"  v-model="formData.password" type="password"  trim/>
                </b-form-group>
              <div class="mt-3">
                <b-button  variant="primary"  block type="submit" >
                  Finish Registration
                </b-button>
              </div>
            </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

export default {

  data() {
    return {
      formData: {
        email: "",
        password: '',
        token: ''
      },
    }
  },

  mounted() {
    this.checkRoute()
  },
  methods: {
    checkRoute(){
      if(Object.keys(this.$route.query).length) {
        this.formData.email = this.$route.query.email;
        this.formData.token = this.$route.query.token;
      }
    },
    async verify(){
      await new Promise((resolve, reject) => {
          this.axios.post('/verify', this.formData)
            .then(res => {
              if (res.status === 200) {
                localStorage.setItem('access_token', this.formData.token);
                resolve(true);
                this.$router.push({name: "Verified"})
              }
            }).catch(error => {
            reject(error)
          })
        })
      },
    },
}
</script>
