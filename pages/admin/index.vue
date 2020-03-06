<template>
  <main>
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">
            All products
          </h1>
          <div class="a-spacing-large"></div>
          <!-- Button -->
          <nuxt-link to="/products" class="a-button-buy-again"
            >Add a new product</nuxt-link
          >
          <nuxt-link to="/categories" class="a-button-history margin-right-10"
            >Add a new category</nuxt-link
          >
          <nuxt-link to="/owners" class="a-button-history margin-right-10"
            >Add a new owner</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="a-spacing-large"></div>
    <!-- Listing Page -->
    <div class="container-fluid browsing-history">
      <div class="row">
        <div
          v-for="product in products"
          v-bind:key="product._id"
          class="col-xs-2 col-lg-2 col-md-3 col-sm-6 br bb"
        >
          <div class="history-box">
            <!-- Product Image -->
            <a href class="a-link-normal">
              <img :src="product.image" alt class="img-fluid" />
            </a>
            <!-- Product Title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{ product.title }}</div>
              </span>
            </div>
            <!-- Product Rating -->
            <div class="a-row">
              <a href>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </a>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-review"
                >(9,710)</span
              >
            </div>
            <!-- Product Price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">${{ product.price }}</span>
              </span>
            </div>
            <!-- Product Buttons -->
            <div class="a-row">
              <nuxt-link
                v-bind:to="`/products/${product._id}`"
                class="a-button-history margin-right-10"
                >Update</nuxt-link
              >
              <a
                href
                class="a-button-history margin-right-10"
                v-on:click.prevent="handleDelete(product._id)"
                >Delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get("/api/products");
      //debugger;
      return { products: response.products };
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    async handleDelete(id) {
      try {
        const response = await this.$axios.$delete(
          `http://localhost:8080/api/products/${id}`
        );
        this.products = this.products.filter(product => product._id !== id);
        return this.products;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
