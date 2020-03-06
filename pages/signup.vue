<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="text-center">
            <nuxt-link to="/">
              <img src="/img/logo-black.png" alt class />
            </nuxt-link>
            <form class="mt-4">
              <div class="a-box a-spacing-extra-large">
                <div class="a-box-inner">
                  <h1 class="a-spacing-small">Create Account</h1>
                  <div class="row a-spacing-base">
                    <label for="ap_costumer_name" class="a-form-table">Your name</label>
                    <input
                      type="text"
                      id="ap_costumer_name"
                      class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                      v-model="name"
                    />
                  </div>
                  <div class="row a-spacing-base">
                    <label for="ap_costumer_name" class="a-form-table">Email</label>
                    <input
                      type="email"
                      id="ap_costumer_name"
                      class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                      v-model="email"
                    />
                  </div>
                  <div class="row a-spacing-base">
                    <label for="ap_costumer_name" class="a-form-table">Password</label>
                    <input
                      type="password"
                      id="ap_costumer_name"
                      class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                      v-model="password"
                    />
                    <div class="a-alert-container">
                      <div class="a-alert-content">Password should be at least 6 characters</div>
                    </div>
                    <div class="a-row a-spacing-extra-large mb-4">
                      <span class="a-button-primary">
                        <span class="a-button-inner">
                          <span class="a-button-text" @click="onSignup">Create your Amazon account</span>
                        </span>
                      </span>
                      <div class="a-row a-spacing-top-medium a-size-small">
                        <b>
                          By creating an account, you agree to Amazon's
                          <a href="#">conditions of Use</a> and
                          <a href="#">Privacy Notice</a>
                        </b>
                      </div>
                    </div>
                    <hr />
                    <div class="a-row">
                      <b>
                        Already have an account?
                        <nuxt-link to="/login" class="a-link-emphasis">Sign in</nuxt-link>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //use a different layout
  layout: "none",
  middleware: "auth",
  auth: "guest",

  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },

  methods: {
    async onSignup() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        const response = await this.$axios.$post("/api/auth/signup", data);

        if (response.success) {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });
          this.$router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
