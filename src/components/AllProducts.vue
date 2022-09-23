<template>
  <div>
    <div class="wrapperBox">
      <div v-for="product in products"
                :key="product.id"
      >
<!--        <ProductItem :product="product"/>-->
      </div>
    </div>


    <div class="wrapperBox">
      <button v-for="page in Array.from(Array(totalPages).keys())"
              :key="page"
              @click="changePage(page + 1)"
              style="margin: 3px"
      >
        {{page + 1}}
      </button>
    </div>
  </div>
</template>

<script>
import Product from "./ProductItem";
import axios from "axios";

export default {
  components: {
    ProductItem: Product
  },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      products:{}
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage)
    },
    products() {
      return this.products.slice((this.currentPage - 1) * this.perPage, (this.currentPage - 1) * this.perPage + this.perPage)
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    getProducts() {
      axios.get('products').then(response => {
          this.products = response.data
          this.originalProducts = this.products;
        }).catch(error => {
          return error
        })
    },
  },

}
</script>

<style scoped>
.wrapperBox {
  display: flex;
  justify-content: center;
}
</style>
