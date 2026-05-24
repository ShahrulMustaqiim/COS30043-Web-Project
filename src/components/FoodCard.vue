<template>
  <div class="card h-100 custom-card">
    <img :src="getImage(food.image)" :alt="food.name" class="card-img-top food-img" />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ food.name }}</h5>

      <p class="card-text text-muted desc">
        {{ food.description }}
      </p>

      <p class="fw-bold">
        RM{{ Number(food.price).toFixed(2) }}
      </p>

      <div class="mt-auto">
        <button class="btn btn-dark btn-sm me-2 w-100 mb-1" :aria-label="'Add ' + food.name + ' to cart'" @click="addToCart">
          Add
        </button>

        <button class="btn btn-outline-dark btn-sm w-100" :aria-label="'View details for ' + food.name" @click="goToDetail">
          View
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FoodCard",
  props: {
    food: Object
  },
  methods: {
    getImage(img) {
      return new URL(`../assets/${img}`, import.meta.url).href;
    },

    addToCart() {
      const user = localStorage.getItem("user");

      if (!user) {
        alert("Please login first!");
        this.$router.push("/login");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(this.food);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(this.food.name + " added to cart");
    },

    goToDetail() {
      this.$router.push(`/food/${this.food.id}`);
    }
  }
}
</script>

<style scoped>
.food-img {
  height: 150px;
  object-fit: cover;
}

.custom-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 12px 25px rgba(0,0,0,0.2);
}

.desc {
  font-size: 14px;
  height: 40px;
  overflow: hidden;
}
</style>