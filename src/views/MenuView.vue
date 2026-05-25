<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Menu</h1>

    <div class="row g-4">
      <div 
        class="col-sm-6 col-md-4 col-lg-3"
        v-for="food in foods"
        :key="food.id"
      >
        <FoodCard :food="food" />
      </div>
    </div>
  </div>
</template>

<script>
import FoodCard from '../components/FoodCard.vue'

export default {
  name: "MenuView",
  components: {
    FoodCard
  },
  data() {
    return {
      foods: []
    }
  },
  mounted() {
    fetch("https://cos-30043-web-project.infinityfreeapp.com/food-api/foods.php")
      .then(res => res.json())
      .then(data => {
        this.foods = data;
      })
      .catch(err => {
        console.error("Failed to load foods:", err);
      });
  },
  methods: {
    addToCart(food) {
      console.log(food.name + " added to cart")
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
}
</style>