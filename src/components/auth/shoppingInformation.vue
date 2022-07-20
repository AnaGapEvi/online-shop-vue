<template>
  <div class="shop">
    <b-card bg-variant="light">


      <validation-observer ref="observer">

            <b-form-group
              label-cols-lg="3"
              label="Shipping Address"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <validation
                name="address"
                rules="required"
              >
                <b-form-group
                  label="Address:"
                  label-for="nested-address"
                  label-cols-sm="3"
                  label-align-sm="right"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.address"
                    type="text"
                    minlength="1"
                    maxlength="10"
                    placeholder="Address..."
                    :state="errors[0] ? false : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation>
              <validation
                name="address"
                rules="required"
              >
            <b-form-group
              label="City:"
              label-for="nested-city"
              label-cols-sm="3"
              label-align-sm="right"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-1"
                v-model="form.city"
                type="text"
                minlength="2"
                maxlength="10"
                placeholder="city..."
                :state="errors[0] ? false : null"
                trim

              ></b-form-input>
            </b-form-group>
              </validation>
              <validation
                name="address"
                rules="required"
              >
            <b-form-group
              label="Country:"
              label-for="nested-country"
              label-cols-sm="3"
              label-align-sm="right"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-1"
                v-model="form.country"
                type="text"
                minlength="2"
                maxlength="10"
                placeholder="country..."
                :state="errors[0] ? false : null"
                trim

              ></b-form-input>
            </b-form-group>
              </validation>
              <validation
                name="address"
                rules="required"
              >
            <b-form-group
              label="Zip Code:"
              label-for="nested-zip"
              label-cols-sm="3"
              label-align-sm="right"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-1"
                v-model="form.zip"
                minlength="2"
                maxlength="15"
                type="number"
                placeholder="zip..."
                :state="errors[0] ? false : null"
                trim

              ></b-form-input>
            </b-form-group>
              </validation>
              <validation
                name="address"
                rules="required"
              >
            <b-form-group
              label="Telephone:"
              label-for="nested-state"
              label-cols-sm="3"
              label-align-sm="right"

              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-1"

                v-model="form.telephone"
                type="number"
                minlength="5"
                maxlength="20"
                placeholder="telephone..."
                :formatter=" phoneValidator"
                :state="errors[0] ? false : null"
                trim

              ></b-form-input>
            </b-form-group>
              </validation>
              <p><span style="color: #e59898" v-if="error!==''">{{error}}</span></p>
               <p>Total: {{this.$route.params.price}} $ </p>
              <b-button variant="success" @click="ship()">Buy</b-button>
              <b-button variant="info" @click="back()">back</b-button>

            </b-form-group>
      </validation-observer>
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
          zip:Number,
          telephone:Number,
          country:''
        },
        error:''
    }
  },
  methods:{
    ship(){
      return new Promise((resolve, reject) => {
          axios.post('/shipping-address', this.form)
            .then(result => {
              resolve(true)
              this.$router.push({name: "Payment", params:{ price: this.$route.params.price}})
            }).catch(error => {
            this.error="all fields is required"
            reject(error)
          })
        })
    },
    back(){
        window.history.go(-1)
    },
    phoneValidator () {
      let phone = /^[2-9]\d{2}-\d{3}-\d{4}$/;
      if (this.phone.value.match(phone)) {
        console.log('true')
      } else {
        console.log('false')
      }
    }
  }
}
</script>

<style scoped>
.shop{
  padding: 70px;
}
</style>
