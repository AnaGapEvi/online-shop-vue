<template>
  <div class="search">
    <h1>Search order by number</h1>

    <div style="display: flex">
      <!--            <b-form-input v-model="keyword" size="sm" class="mr-sm-2" placeholder="Enter order number"></b-form-input>-->
      <!--            <input v-model="search" v-if="search.length>0,  $router.push(`/search-order/`) " size="sm" class="mr-sm-2" placeholder="Enter order number number">-->
      <b-input type="number" v-model="searchOrder" size="lg" class="mr-sm-2" placeholder="Enter order number"></b-input>
      <b-button @click.prevent="OrderItems()" size="sm" style="display: flex" class="my-2 my-sm-0" type="submit"><b-icon icon="search" aria-hidden="true"></b-icon>Search</b-button>
    </div>

    <div v-if="length===1" style="width: 50%;text-align: center; margin-top: 100px">
      <p>OrderStatus:  {{order.status}}</p>
      <p>Amount: {{order.amount}}</p>
      <p>Date: {{order.created_at}}</p>
    </div>
    <span v-else style="color: #e55757">{{error}}</span>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return{
      order:[],
      searchOrder: '',
      error:'',
      length:0
    }
  },
  methods:{
    OrderItems(){
      if(this.searchOrder!==''){
        axios.get('/order-items/'+this.searchOrder)
          .then((resp)=> {
            this.order=resp.data
            this.length=1
          }).catch((error) => {
          this.length=0
          this.error=error.response.data.message
        })
      } else {
        this.error = "fill in the  field!!!"
      }

    },
  },

}
</script>

<style scoped>
.search{
  color: white;
  background-color: #698d94;
  min-height: 100vh;
  padding: 70px 50px;

}

</style>
