<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new category</h2>
            <form>
              <!-- Category Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Type</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="type"
                />
              </div>
              <!-- Button  -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" v-on:click="submitForm"
                      >Add Category</span
                    >
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul
              v-for="category in categories"
              :key="category._id"
              class="list-group-item"
            >
              <li>{{ category.type }}</li>
            </ul>
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
      const response = await $axios.$get("/api/categories");
      //debugger;
      return { categories: response.categories };
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async submitForm() {
      try {
        const data = { type: this.type };

        const response = await this.$axios.$post("/api/categories", data);
        return this.categories.push(data);

        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
