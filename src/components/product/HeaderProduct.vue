<template>
  <div>
    <h1>Product List</h1>
    <div>
      <b-form-input style="width: 300px;margin-left: 1290px;" id="input-1" v-model="search" type="text" placeholder="Search By Name" required></b-form-input>
    </div>
    <b-button style="margin-left: 1600px;margin-top: -66px" variant="primary" @click="searchProduct()">Search</b-button>
  </div>
</template>

<script>
export default {
  name: "HeaderProduct",
  props: {
    search: {
      type: String,
      default: ''
    },
    page: {
      type: String,
      default: ''
    }
  },
  methods: {
    searchProduct() {
      this.$root.$emit('eventSearch', this.search)
    },
  }
}
</script>

<style scoped>

</style>
