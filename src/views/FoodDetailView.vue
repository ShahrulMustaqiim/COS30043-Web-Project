<template>
  <div class="container">

    <h1 class="text-center mb-4">Food Detail</h1>

    <div v-if="food" class="card">
      <!-- IMAGE -->
      <img :src="getImage(food.image)" width="200" class="img-fluid rounded mx-auto d-block mb-3"/>

      <h2>{{ food.name }}</h2>

      <p class="price">
        Price: RM{{ Number(food.price).toFixed(2) }}
      </p>

      <!-- DESCRIPTION -->
      <p class="desc">{{ food.description }}</p>

      <button class="btn btn-dark btn-sm" @click="addToCart">Add to Cart</button>
    </div>

    <div v-else>
      <p>Food not found</p>
    </div>

    <div class="text-center mb-3 mt-4">
      <button class="btn btn-outline-dark px-5 btn-sm " @click="$router.push('/menu')">Back to Menu</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FoodDetailView",

  data() {
    return {
      food: null
    }
  },

  mounted() {
    const id = this.$route.params.id;

    fetch("https://cos-30043-web-project.infinityfreeapp.com/food-api/foods.php")
      .then(res => res.json())
      .then(data => {
        this.food = data.find(f => f.id == id);
      })
      .catch(err => {
        console.error("Error loading food:", err);
      });
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
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.card {
  border: none;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.price {
  font-weight: bold;
  margin: 10px 0;
}

.desc {
  color: #555;
  margin-bottom: 15px;
}
</style>