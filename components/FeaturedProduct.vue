
<template>
  <main class="mainContent">
    <div class="unified_widget pageBanner">
      <!-- <h1>Books at Amazon</h1> -->
      <!-- <p>
        <b>
          Browse for more Books
          <a href="">leaders of notable people</a>, or
          <a href="">Fantasy books</a> like harry potter or Game of thrones
          <a href="">Best Fantasy books of the year so far</a>
        </b>
      </p>-->
    </div>
    <div class="bx-root">
      <div class="row">
        <!-- <div class="col-sm-5 text-center">
          <div class="bx-root-image">
            <img src="/img/header.jpg" alt />
          </div>
        </div>-->
        <!-- <div class="col-sm-7 auto">
          <div class="bx-root-dtls">
            <div class="bx-root-heading">The Program</div>
          </div>
          <div class="bx-root-subtext">Inside the Mind of the legendary Author JK Rowling</div>
          <div class="bx-root-link">
            <span>Order Now</span>
          </div>
        </div>-->
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
.bx-root {
  background-image: url("/img/header.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 101%;
  height: 179px;
  margin-top: -5px;
  height: 179px;
  margin-left: 4px;
}

@media screen and (max-width: 992px) {
  .bx-root {
    display: none;
  }
}
</style>
