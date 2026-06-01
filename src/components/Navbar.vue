<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top shadow-sm">
    
    <!-- Brand -->
    <router-link class="navbar-brand" to="/">MalaysiaFoodHub</router-link>

    <!-- Mobile Toggle Button -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible Content -->
    <div class="collapse navbar-collapse" id="navbarContent">

      <!-- Left side -->
      <div class="navbar-nav">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/menu">Menu</router-link>
        <router-link class="nav-link" to="/cart">Cart</router-link>
      </div>

      <!-- Right side -->
      <div class="ms-auto d-flex align-items-center">

        <!-- If logged in -->
        <template v-if="user">
          <router-link class="nav-link text-white" to="/dashboard">Dashboard</router-link>
          <router-link class="nav-link text-white" to="/orders">Orders</router-link>

          <!-- Dark Mode Toggle -->
          <button class="btn btn-outline-light btn-sm ms-2 me-2" @click="$emit('toggle-dark')">
            {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
          </button>

          <button class="btn btn-outline-light btn-sm ms-2" aria-label="Logout from account" @click="logout">
            Logout
          </button>
        </template>

        <!-- If NOT logged in -->
        <template v-else>
          <router-link class="nav-link text-white" to="/login">Login</router-link>
          <router-link class="nav-link text-white" to="/register">Register</router-link>

          <!-- Dark Mode Toggle -->
          <button class="btn btn-outline-light btn-sm ms-2 me-2" @click="$emit('toggle-dark')">
            {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      user: null
    }
  },

  mounted() {
    this.updateUser();

    window.addEventListener("userChanged", this.updateUser);
  },

  beforeUnmount() {
    window.removeEventListener("userChanged", this.updateUser);
  },

  methods: {
    updateUser() {
      const user = localStorage.getItem("user");
      this.user = user ? JSON.parse(user) : null;
    },
    logout() {
      
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // check cart first
      if (cart.length > 0) {
        alert("Please empty your cart before logging out!");
        this.$router.push("/cart");
        return;
      }

      localStorage.removeItem("user");

      window.dispatchEvent(new Event("userChanged"));

      this.$router.push("/login");
    }
  },

  props: {
    darkMode: Boolean
  },
}
</script>

<style scoped>
.nav-link {
  color: white !important;
  margin-right: 10px;
}

.nav-link:hover {
  color: #ccc !important;
}

.router-link-active {
  color: white !important;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.3rem;
}

.nav-link:hover {
  text-decoration: underline;
}

.navbar {
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.navbar-nav .nav-link {
  margin-right: 10px;
}

@media (max-width: 992px) {

  .navbar-nav {
    margin-top: 10px;
  }

  .ms-auto {
    margin-top: 10px;
  }

}
</style>