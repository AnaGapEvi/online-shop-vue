<template>
  <div class="py-8 flex justify-center">
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :sessionId="sessionId"
    />
    <button class=" bg-blue-500 px-2 py-1 rounded text-white" @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout  } from "@vue-stripe/vue-stripe";
import axios from "axios";
export default {
  components: {
    StripeCheckout ,
  },
  data() {
    return {
      publishableKey: "pk_test_51KtYynFJTg08EEU2sYHLN0LKrnZTuJCazai8jmokQ2096V7IXYjX2XsdGi7xh5jOgSCz5nnn7YfJS5afTtEHRSxk00EUEcmhsj",
      sessionId: null,
    };
  },
  mounted() {
    this.getSession()
  },
  methods: {
    getSession() {
      axios.get('getSession').then(res => {
        this.sessionId = res.data.id
      }).catch(err => {

      });
    },
    submit () {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  }
};
</script>
