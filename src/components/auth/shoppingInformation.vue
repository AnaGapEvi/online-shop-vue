<template>
  <div>
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        label="Shipping Address"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
            <b-form-group
              label="Address:"
              label-for="nested-address"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input id="nested-street" v-model="form.address"></b-form-input>
            </b-form-group>

            <b-form-group
              label="City:"
              label-for="nested-city"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input id="nested-city" v-model="form.city"></b-form-input>
            </b-form-group>

            <b-form-group
              label="Country:"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input id="nested-country" v-model="form.country"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Zip Code:"
              label-for="nested-zip"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input id="nested-zip" v-model="form.zip"></b-form-input>
            </b-form-group>

            <b-form-group
              label="Telephone:"
              label-for="nested-state"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input type="number" id="nested-telephone" v-model="form.telephone" required></b-form-input>
            </b-form-group>
        <b-button variant="success" @click="ship()">Buy</b-button>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
      return {
        form:{
          address:'',
          city:'',
          zip:'',
          telephone:'',
          country:''

        }
    }
  },
  methods:{
    ship(){
      return new Promise((resolve, reject) => {
          axios.post('/shipping-address', this.form)
            .then(result => {
              resolve(true)
              this.$router.push({name: "Payment"})
            }).catch(error => {
              alert('lracreq bolor dashter@')
            reject(error)

          })
        })



    }
  }
}
</script>

<style scoped>

</style>
