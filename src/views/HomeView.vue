<template>
  <main class="container mt-4 text-center">

    <h1 class="mb-3">Welcome to MalaysiaFoodHub</h1>
    <p class="mb-4 text-muted">
      Discover delicious Malaysian food and order instantly!
    </p>

    <!-- Buttons -->
    <div class="mb-5">
      <button class="btn btn-dark me-2" @click="$router.push('/menu')">
        Browse Menu
      </button>

      <button v-if="!user" class="btn btn-outline-dark me-2" @click="$router.push('/login')">
        Login
      </button>

      <button v-if="!user" class="btn btn-outline-dark" @click="$router.push('/register')">
        Register
      </button>

      <button v-if="user" class="btn btn-outline-dark" @click="$router.push('/dashboard')">
        Dashboard
      </button>
    </div>

    <!-- Featured Foods -->
    <h4 class="mb-4">Popular Dishes</h4>

    <div class="row g-4 justify-content-center">
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="food in foods" :key="food.id">
        <div class="card shadow-sm h-100">
          <img :src="getImage(food.image)" class="card-img-top food-img" />

          <div class="card-body">
            <h6>{{ food.name }}</h6>

            <!-- ⭐ Rating -->
            <div class="text-warning mb-1">
              ⭐⭐⭐⭐⭐
            </div>

            <small class="text-muted">
              RM{{ Number(food.price).toFixed(2) }}
            </small>
          </div>
        </div>
      </div>
    </div>
  

    <!-- Delivery Coverage -->
    <div class="mt-5 mb-3">

      <h4 class="mb-3">Delivery Coverage:</h4>

      <div class="card shadow-sm p-4">

        <div class="row align-items-center">

          <!-- Delivery Info -->
          <div class="col-md-5 text-start">

            <h5><strong>MalaysiaFoodHub</strong></h5>

            <p class="text-muted mb-3">
              Located in Kuala Lumpur, serving delicious Malaysian cuisine daily.
            </p>

            <p>
              <strong>Estimated Delivery Radius:</strong>
              15 km
            </p>

            <p>
              <strong>Average Delivery Time:</strong>
              20–30 mins
            </p>

            <p>
              <strong>Delivery Fee:</strong>
              RM3 – RM7
            </p>

            <p>
              <strong>Operating Hours:</strong>
              10:00 AM – 10:00 PM
            </p>

            <span class="badge bg-success">Delivery Available</span>

          </div>

          <!-- Google Map -->
          <div class="col-md-7">

            <div class="ratio ratio-16x9 rounded overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.762394308865!2d101.71047566291625!3d3.157230569540752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d12d669c1f%3A0xc955b08cfc1aae29!2sSuria%20KLCC!5e0!3m2!1sen!2smy!4v1778350375956!5m2!1sen!2smy" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="MalaysiaFoodHub Delivery Coverage Map"></iframe>
            </div>

          </div>

        </div>

      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",

  data() {
    return {
      user: null,
      foods: []
    }
  },

  mounted() {
    this.user = localStorage.getItem("user");

    fetch("https://cos-30043-web-project.infinityfreeapp.com/food-api/foods.php")
      .then(res => res.json())
      .then(data => {
        this.foods = data.slice(0, 6); // show only 6 foods
      });
    },

  methods: {
    getImage(img) {
      return new URL(`../assets/${img}`, import.meta.url).href;
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.subtitle {
  margin: 10px 0 20px;
  color: #555;
}

.buttons button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #555;
}

.food-img {
  height: 140px;
  object-fit: cover;
}
</style>