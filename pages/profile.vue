<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Profile page</h2>
            <nuxt-link to="/" v-on:click="handleLogout">Logout</nuxt-link>
            <form>
              <!-- Name Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Name</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="name"
                  :placeholder="$auth.$state.user.name"
                />
              </div>
              <!-- Email Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Email</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="email"
                  :placeholder="$auth.$state.user.email"
                />
              </div>
              <!-- Password Input -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Password</label>
                <input type="text" class="a-input-text" style="width: 100%" v-model="password" />
              </div>
              <!-- Button  -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" v-on:click="handleUpdateProfile">Update profile</span>
                  </span>
                </span>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async handleUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        const response = await this.$axios.$put(`/api/auth/user`, data);

        if (response.success) {
          (this.name = ""), (this.email = ""), (this.password = "");
        }

        //fecth the API back to have updated values
        await this.$auth.fetchUser();
        // this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async handleLogout() {
      // @Todo fix the logout
      await this.$auth.logout();
    }
  }
};
</script>

<style>
</style>