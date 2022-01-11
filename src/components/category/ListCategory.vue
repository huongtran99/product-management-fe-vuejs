<template>
  <div>
    <h1>Category List</h1>
    <b-table striped hover :items="categories" :fields="fields">
      <template #cell(index)="data">{{ data.index + 1 }}</template>
    </b-table>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "ListCategory",
  data() {
    return {
      fields: [
        {key: 'index', label: 'index'},
        {key: 'name', label: 'Name'}
      ],
      categories: [],
    }
  },
  methods: {
    async getCategory() {
      this.categories = await api.call('GET', `/category`);
    }
  },
  mounted() {
    this.getCategory();
  },
}
</script>

<style scoped>

</style>
