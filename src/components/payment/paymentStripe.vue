<template>
    <div class="container">

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Make A Charge</div>
          <div class="panel-body">
<!--            <fieldset>-->
              <validation-observer ref="observer">
                <b-form v-on:submit.prevent="onsubmit()">
                  <validation
                    name="email"
                    rules="required|email"
                  >
                    <b-form-group
                      label-class="form-label"
                      label="Email Address"
                      label-for="email"
                      slot-scope="{ errors }"
                      :invalid-feedback="errors[0]"
                    >
                      <b-form-input
                        id="email"
                        v-model="email"
                        :state="errors[0] ? false : null"
                        trim
                      />
                    </b-form-group>
                  </validation>
                  <validation
                    name="desc"
                    rules="required"
                  >
                    <b-form-group
                      label-class="form-label"
                      label="Description"
                      label-for="Desc"
                      slot-scope="{ errors }"
                      :invalid-feedback="errors[0]"
                    >
                      <b-form-input

                        id="email"
                        v-model="description"
                        :state="errors[0] ? false : null"
                        trim
                        disabled
                      />
                    </b-form-group>
                  </validation>
                  <validation
                    name="card-number"
                    rules="required|max:16|min:16"
                  >
                    <b-form-group
                      label-class="form-label"
                      label="Card number"
                      label-for="Card number"
                      :max="16"
                      aria-placeholder="****************"
                      slot-scope="{ errors }"
                      :invalid-feedback="errors[0]"
                    >
                      <b-form-input
                        type="number"
                        id="number"
                        v-model="card.card_number"
                        :state="errors[0] ? false : null"
                        :max="16"
                        trim
                      />
                    </b-form-group>
                  </validation>
              <div class="form-group">
                <label class="col-sm-3 control-label" for="expiry-month">Expiration Date</label>
                <div class="col-sm-9">
                  <div class="row">
                    <div class="col-xs-3">
                      <select class="form-control" name="expiry-year" autocomplete="cc-exp-year" v-model="card.expiry_year">
                        <option value="22">2022</option>
                        <option value="23">2023</option>
                        <option value="24">2024</option>
                        <option value="25">2025</option>
                        <option value="26">2026</option>
                      </select>
                    </div>
                    <div class="col-xs-3">
                      <select class="form-control col-sm-2" name="expiry-month" id="expiry-month" autocomplete="cc-exp-month" v-model="card.expiry_month">
                        <option value="01" >Jan (01)</option>
                        <option value="02" >Feb (02)</option>
                        <option value="03" >Mar (03)</option>
                        <option value="04" >Apr (04)</option>
                        <option value="05" >May (05)</option>
                        <option value="06" >June (07)</option>
                        <option value="08" >Aug (08)</option>
                        <option value="09">Sep (09)</option>
                        <option value="10">Oct (10)</option>
                        <option value="11">Nov (11)</option>
                        <option value="12">Dec (12)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
                  <validation
                    name="card-cvv"
                    rules="required"
                  >
                    <b-form-group
                      label-class="form-label"
                      label="Card cvv"
                      label-for="Card cvv"
                      aria-placeholder="****"
                      slot-scope="{ errors }"
                      :invalid-feedback="errors[0]"
                    >
                      <b-form-input
                        type="number"
                        id="number"
                        v-model="card.cvv"
                        :state="errors[0] ? false : null"
                        :formatter="formatYear"
                        trim
                      />


                    </b-form-group>
                  </validation>


                  <button type="button" class="btn btn-success" @click.prevent="onsubmit">Amount: {{this.$route.params.price}} $ Pay Now</button>
                  <p><span style="color: #e59898" v-if="error!==''">{{error}}</span></p>

                </b-form>
              </validation-observer>
<!--            </fieldset>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import axios from "axios";
export default {
  data(){
    return{
      error:'',
      value:'4',
      card: {
        card_number: null,
        expiry_year: null,
        expiry_month: null,
        cvv: null
      },
      amount: this.$route.params.price,
      email: null,
      description: 'visa'
    }
  },
  methods: {
    formatYear(e){
      return String(e).substring(0,4);
    },
    onsubmit(){
      if(this.card.expiry_year !== null && this.card.expiry_month !== null && this.card.card_number !== null && this.card.cvv !== null && this.email !== null){
        axios.post('/charge',{card: this.card, amount: this.amount, description: this.description})
          .then(function(data){
            alert('Your payment is complete!')
            this.$router.push({name: "HelloWorld"})
          }).catch(error => {
          // this.error="all fields is required"
        })
      } else {
        this.error="all fields is required"
      }
    }
  }
}
</script>
