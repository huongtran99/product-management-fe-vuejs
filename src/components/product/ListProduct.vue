<template>
  <div>
    <header-product></header-product>
    <b-button v-b-modal.my-modal variant="primary" style="margin-right: 1500px">Add Product</b-button>
    <b-table striped hover :items="products" :fields="fields">
      <template #cell(index)="data">{{ data.index + 1 }}</template>
      <template #cell(info)="data">
        <router-link :to="/product/+data.item._id">
          <b-button variant="primary">Info</b-button>
        </router-link>
      </template>
      <template #cell(edit)="data">
        <b-button v-b-modal.my-modal-edit variant="warning" @click="showFormEdit(data.item._id)">Edit</b-button>
      </template>
      <template #cell(delete)="data">
        <b-button v-b-modal.my-modal-delete variant="danger" @click="showFormDelete(data.item._id)">Delete</b-button>
      </template>
    </b-table>
    <b-modal id="my-modal">
      <b-form-group
          id="input-group-1"
          label="Product Name:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="name"
            type="text"
            placeholder="Enter Name"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-1"
          label="Price:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="price"
            type="number"
            placeholder="Enter Price"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-1"
          label="Description:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="description"
            type="text"
            placeholder="Enter Description"
            required
        ></b-form-input>
      </b-form-group>
      <br>
      <b-button variant="primary" @click="addProduct">Add New Product</b-button>
    </b-modal>

    <b-modal id="my-modal-edit">
      <b-form-group
          id="input-group-1"
          label="Product Name:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="product.name"
            type="text"
            placeholder="Enter Name"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-1"
          label="Price:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="product.price"
            type="number"
            placeholder="Enter Price"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-1"
          label="Description:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="product.description"
            type="text"
            placeholder="Enter Description"
            required
        ></b-form-input>
      </b-form-group>
      <br>
      <b-button variant="primary" @click="editProduct(product.id)">Update Product</b-button>
    </b-modal>

    <b-modal id="my-modal-delete">
      <p>Name: {{ product.name }}</p>
      <p>Price: {{ product.price }}</p>
      <p>Description: {{ product.description }}</p>
      <br>
      <b-button variant="primary" @click="deleteProduct(product.id)">Delete Product</b-button>
    </b-modal>
    <div class="overflow-auto">
      <div class="mt-3">
        <b-pagination-nav v-model="page" :number-of-pages="3" base-url="/products/" first-number last-number page-click></b-pagination-nav>
      </div>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import HeaderProduct from "@/components/product/HeaderProduct";

export default {
  name: "ListProduct",
  components: {
    HeaderProduct
  },
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
  data() {
    return {
      fields: [
        {key: 'index', label: 'index'},
        {key: 'name', label: 'Name'},
        {key: 'price', label: 'Price'},
        {key: 'description', label: 'Description'},
        {key: 'info', label: 'Info'},
        {key: 'edit', label: 'Edit'},
        {key: 'delete', label: 'Delete'},
      ],
      products: [],
      name: '',
      price: '',
      description: '',
      product: {
        id: '',
        name: '',
        price: '',
        description: ''
      },
    }
  },
  methods: {
    async getProduct() {
      this.products = await api.call('GET', `/product/${this.page}?search=${this.search}`);
    },
    async addProduct() {
      let body = {
        name: this.name,
        price: this.price * 1,
        description: this.description
      };
      await api.call('POST', '/product', body);
      this.products = await api.call('GET', '/product');
      this.$bvModal.hide('my-modal');
    },
    async showFormEdit(id) {
      let data = await api.call('GET', `/product/info/${id}`);
      let parseData = JSON.parse(JSON.stringify(data));
      this.product.id = parseData[0]._id;
      this.product.name = parseData[0].name;
      this.product.price = parseData[0].price;
      this.product.description = parseData[0].description;
    },
    async editProduct(id) {
      console.log(id);
      let body = {
        id: id,
        name: this.product.name,
        price: this.product.price * 1,
        description: this.product.description
      };
      console.log(body);
      await api.call('POST', '/product/edit', body)
      this.products = await api.call('GET', '/product');
      this.$bvModal.hide('my-modal-edit');
    },
    async showFormDelete(id) {
      let data = await api.call('GET', `/product/info/${id}`)
      let parseData = JSON.parse(JSON.stringify(data));
      this.product.id = parseData[0]._id;
      this.product.name = parseData[0].name;
      this.product.price = parseData[0].price;
      this.product.description = parseData[0].description;
    },
    async deleteProduct(id) {
      let body = {
        id: id,
        name: this.product.name,
        price: this.product.price * 1,
        description: this.product.description
      };
      await api.call('POST', '/product/delete', body);
      this.products = await api.call('GET', '/product');
      this.$bvModal.hide('my-modal-delete');
    },
    async listener(data){
      this.products = await api.call('GET', `/product/${this.page}?search=${data}`);
    }
  },
  beforeCreate() {
    console.log('bc')
  },
  created() {
    console.log('c')
  },
  beforeMount() {
    console.log('bm')
  },
  mounted() {
    this.getProduct();
    this.$root.$on('eventSearch',this.listener)
  },
  beforeDestroy() {
    console.log('bd')
    this.$root.$off('eventSearch',this.listener)
  },
}
</script>

<style scoped>

</style>
