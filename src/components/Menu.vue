<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="info">
      <b-navbar-brand to="/">ESBT</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link style="margin-right: 10px" to="/products/1">List Product</router-link>
          <router-link to="/category">List Category</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form style="margin-left: 1000px; margin-top: 5px">
            <div style="float: left">
              <b-form-input size="sm" class="mr-sm-2" v-model="search" placeholder="Search"></b-form-input>
            </div>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" style="margin-left: 10px;"
                      @click.prevent="searchProduct()">Search
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown style="margin-left: 10px;" text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Menu",
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
    }
  },
  methods: {
    searchProduct() {
      window.location.href = `http://localhost:8080/products/1?search=${this.search}`;
      //this.$router.push(`${this.page}?search=${this.search}`);
      console.log(this.params.page);
    },
  }
}
</script>

<style scoped>

</style>
