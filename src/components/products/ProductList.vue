<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Products</h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createproduct');">
            Add product
          </button>
      <div class="row mt-3">
        <product-list-item
          @productDeleted="loadData"
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProductListItem from "./ProductListItem.vue";
import Axios from "axios";

export default {
  name: "ProductList",
  components: {
    ProductListItem,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      Axios.get('http://localhost/products')
          .then(
              result => {
                this.products = result.data
                console.log(result)
              })
          .catch(
              error => console.log(error)
          )
    }
  }
};
</script>

<style>
</style>
