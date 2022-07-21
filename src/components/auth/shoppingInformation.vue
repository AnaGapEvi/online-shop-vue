<template>
  <div class="shop">
    <b-card bg-variant="light">
      <h3>Shopping address</h3>
      <validation-observer ref="observer">
        <validation
                name="country"
                rules="required"
              >
                <b-form-group
                  label="Country:"
                  label-for="nested-address"
                  label-cols-sm="3"
                  label-align-sm="right"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-select  style="width: 100%; padding: 10px" @change="onChange($event)">
                    <option>Country</option>
                    <option v-for="country in countries" >
                      {{country.country}}
                    </option>
                  </b-select>
                </b-form-group>
        </validation>
        <validation
          name="address"
          rules="required"
        >
          <b-form-group
            label="City:"
            label-for="nested-address"
            label-cols-sm="3"
            label-align-sm="right"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-select style="width: 100%; padding: 10px" @change="onChangeCity($event)">
              <option>City</option>
              <option v-for="city in cities" >
                {{city}}
              </option>
            </b-select>
          </b-form-group>
        </validation>
        <validation
                name="address"
                rules="required"
              >
            <b-form-group
              label="Address:"
              label-for="nested-city"
              label-cols-sm="3"
              label-align-sm="right"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="input-1"
                v-model="form.address"
                type="text"
                placeholder="address..."
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
                type="number"
                :formatter="formatZip"
                placeholder="zip..."
                :state="errors[0] ? false : null"
                trim

              ></b-form-input>
            </b-form-group>
        </validation>
        <validation
                name="address"
                rules="required|min:3|max:15"
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
                :formatter="formatTel"
                placeholder="telephone..."
                :state="errors[0] ? false : null"
                trim
              ></b-form-input>
            </b-form-group>
        </validation>
              <p><span style="color: #e59898" v-if="error!==''">{{error}}</span></p>
               <p>Total: {{this.$route.params.price}} $ </p>
              <b-button variant="success" @click="ship()">Buy</b-button>
              <b-button variant="info" @click="back()">back</b-button>

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
          telephone:'',
          country:''
        },
        error:'',
        phone:Number,
        countries:{},
        cities:[],
        city:[]
    }
  },
  mounted() {
    this.country()
  },
  methods:{
    ship(){
      return new Promise((resolve, reject) => {
          axios.post('/shipping-address', this.form)
            .then(result => {
              resolve(true)
              this.$router.push({name: "Payment", params:{ price: this.$route.params.price}})
            }).catch(error => {
            console.log(this.form)
            this.error="all fields is required"
            reject(error)
          })
        })
    },
    back(){
        window.history.go(-1)
    },
    formatZip(e){
      return String(e).substring(0,7);
    },
    formatTel(e){
      return String(e).substring(0,15);
    },
    onChange(event) {
      console.log(event)
      this.form.country=event
      this.city= this.countries.filter((e)=>e.country == this.form.country )
      this.cities=this.city[0].cities
    },
    onChangeCity(event){
      console.log(event)
      this.form.city=event
      console.log(this.form.city)
    },

    country(){
      fetch('https://countriesnow.space/api/v0.1/countries')
        .then(response => response.json())
        .then(data => {
          this.countries = data.data

      })
    }
  }
}
</script>

<style scoped>
.shop{
  padding: 70px;
}
</style>
