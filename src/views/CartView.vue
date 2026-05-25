<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Cart</h1>

    <div v-if="cart.length === 0" class="text-center mt-5">
      <h5>Your cart is empty</h5>
      <button class="btn btn-dark mt-3" @click="$router.push('/menu')">Go to Menu</button>
    </div>

    <div v-else>
      <CartItem v-for="(item, index) in cart" :key="index" :item="item"@remove="removeItem(index)"/>

      <div class="card p-3 mt-3 shadow-sm">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Total: </h5>
          <h5 class="mb-0">RM{{ totalPrice.toFixed(2) }}</h5>
        </div>

        <button class="btn btn-success w-100 mt-2" @click="placeOrder">
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue'

export default {
  name: "CartView",

  components: {
    CartItem
  },

  data() {
    return {
      cart: []
    }
  },

  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + Number(item.price), 0)
    }
  },

  mounted() {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to access the cart page!");
      this.$router.push("/login");
      return;
    }

    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },

  methods: {
    removeItem(index) {
      this.cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },

    async placeOrder() {
      
      const raw = localStorage.getItem("user");

      if (!raw) {
        alert("Please login first!");
        this.$router.push("/login");
        return;
      }

      const userData = JSON.parse(raw);

      if (this.cart.length === 0) {
        alert("Cart is empty!");
        return;
      }

      try {

        const res = await fetch("https://cos30043-web-project-backend-production-e458.up.railway.app/orders.php", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            user: userData.email,
            items: this.cart,
            total: this.totalPrice
          })

        });

        const text = await res.text();

        console.log("RAW RESPONSE:", text);

        const data = JSON.parse(text);

        if (data.status === "success") {

          alert("Order placed successfully!");

          // clear cart
          this.cart = [];
          localStorage.removeItem("cart");

        } else {

          alert(data.message);

        }

      } catch (err) {

        console.error(err);
        alert("Server error");

      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}
</style>