<template>
  <div>
    <p>Name: {{ product.name }}</p>
    <p>Price: {{ product.price }}</p>
    <p>Description: {{ product.description }}</p>
    <router-link to="/products/1">Back List Product</router-link>
  </div>
</template>

<script>

import api from "@/api/api";

export default {
  name: "ProductDetail",
  data() {
    return {
      url_data: null,
      product: {
        id: '',
        name: '',
        price: '',
        description: ''
      },
    }
  },
  methods: {
    async getProductDetail() {
      let data = await api.call('GET', `/product/info/${this.url_data}`);
      let parseData = JSON.parse(JSON.stringify(data));
      this.product.id = parseData[0]._id;
      this.product.name = parseData[0].name;
      this.product.price = parseData[0].price;
      this.product.description = parseData[0].description;
    }
  },
  mounted() {
    this.url_data = this.$route.params.id;
    this.getProductDetail();
  },
}
</script>

<style scoped>

</style>
