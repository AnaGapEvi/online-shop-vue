<template>
  <div>
    <form method="get">
      <input type="date" name="start" v-model="form.start">
      <input type="date" name="end" v-model="form.end">
      <button @click.p.prevent="getReports()">Get Reports</button>
    </form>
    <b-table striped hover :items="repeats"></b-table>
    <b-table striped hover :items="errors" ></b-table>

  </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
      return{
        form:{
          start:'',
          end:''
        },
        repeats:[],
        errors:[]
      }
    },
    methods:{
      getReports(){
        // axios.post('/add-card', this.card)
        axios.post('/reports', this.form).then((res) => {
            if(res){
              this.repeats = res.data
            } else {
              alert("this reports not found")
            }
          })
          .catch((e) =>{
            this.errors.push('this reports not found')
          })

      },
    }
}
</script>

<style scoped>

</style>
