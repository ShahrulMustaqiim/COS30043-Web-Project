<template>
  <div class="container mt-5">

    <!-- Welcome Card -->
    <div class="card shadow-sm p-4 mb-4 text-center">

      <h1 class="mb-3">
        Welcome back, {{ user }}!
      </h1>

      <p class="text-muted">
        Ready to enjoy your favourite Malaysian dishes today?
      </p>

    </div>

    <!-- Dashboard Stats -->
    <div class="row g-4 mb-4">

      <!-- Cart -->
      <div class="col-md-4">
        <div class="card shadow-sm text-center p-4 h-100">

          <h5>Cart Items</h5>

          <h2>{{ cartCount }}</h2>

          <button class="btn btn-outline-dark mt-3" @click="$router.push('/cart')">
            View Cart
          </button>

        </div>
      </div>

      <!-- Orders -->
      <div class="col-md-4">
        <div class="card shadow-sm text-center p-4 h-100">

          <h5>Orders</h5>

          <h2>{{ orderCount }}</h2>

          <button class="btn btn-outline-dark mt-3" @click="$router.push('/orders')">
            Order History
          </button>

        </div>
      </div>

      <!-- Menu -->
      <div class="col-md-4">
        <div class="card shadow-sm text-center p-4 h-100">

          <h5>Explore Menu</h5>

          <button class="btn btn-outline-dark mt-4" @click="$router.push('/menu')">
            Browse Menu
          </button>

        </div>
      </div>

    </div>

    <!-- Account Info -->
    <div class="card shadow-sm p-4">

      <h4 class="mb-3">Account Information</h4>

      <p>
        <strong>Name:</strong>
        {{ user }}
      </p>

      <p>
        <strong>Email:</strong>
        {{ email }}
      </p>

      <p>
        <strong>Total Orders:</strong>
        {{ orderCount }}
      </p>

      <p>
        <strong>Delivery Area:</strong>
        Kuala Lumpur
      </p>

    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      user: "",
      email: "",
      cartCount: 0,
      orderCount: 0,
      darkMode: false
    }
  },

  mounted() {
    this.updateUser();

    window.addEventListener("userChanged", this.updateUser);

    // cart count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cartCount = cart.length;

    // dark mode status
    this.darkMode = localStorage.getItem("darkMode") === "true";

    // order count from database
    const raw = localStorage.getItem("user");

    if (raw) {

      const user = JSON.parse(raw);

      fetch("https://cos-30043-web-project.infinityfreeapp.com/food-api/get_orders.php?user=" + user.email)
        .then(res => res.json())
        .then(data => {
          this.orderCount = data.length;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },

  beforeUnmount() {
    window.removeEventListener("userChanged", this.updateUser);
  },

  methods: {
    updateUser() {
      const raw = localStorage.getItem("user");

      if (!raw) {
        this.$router.push("/login");
        return;
      }

      const user = JSON.parse(raw);

      this.user = user?.name || "User";
      this.email = user?.email || "";
    }
  }
}
</script>

<style scoped>
</style>