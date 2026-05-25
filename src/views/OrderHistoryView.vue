<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Order History</h1>

    <div v-if="orders.length === 0" class="text-center mt-5">
      <h5>No orders yet!</h5>
      <button class="btn btn-dark mt-3" @click="$router.push('/menu')">Browse Menu</button>
    </div>

    <div v-else>
      <div v-for="(order, index) in orders" :key="order.id" class="card mb-3 shadow-sm">
        <div class="card-body">

          <!-- Order Header -->
          <div class="d-flex justify-content-between mb-2">
            <h5>Order #{{ index + 1 }}</h5>
            <small class="text-muted">{{ formatDate(order.created_at) }}</small>
          </div>

          <!-- Items -->
          <ul class="list-group list-group-flush mb-2">
            <li class="list-group-item d-flex justify-content-between" v-for="item in order.items" :key="item.id">
              <span>{{ item.name }}</span>
              <span>RM{{ Number(item.price).toFixed(2) }}</span>
            </li>
          </ul>

          <!-- Total -->
          <div class="d-flex justify-content-between fw-bold">
            <span>Total: </span>
            <span>RM{{ Number(order.total).toFixed(2) }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHistoryView",

  data() {
    return {
      orders: []
    }
  },

  mounted() {
    
    const raw = localStorage.getItem("user");

    if (!raw) {
      alert("Please login first!");
      this.$router.push("/login");
      return;
    }

    const user = JSON.parse(raw);

    fetch("https://cos30043-web-project-backend-production-e458.up.railway.app/get_orders.php?user=" + user.email)
      .then(res => res.json())
      .then(data => {

        this.orders = data.map(order => ({
          ...order,
          items: JSON.parse(order.items)
        }));

      })
      .catch(err => {
        console.error(err);
      });
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>