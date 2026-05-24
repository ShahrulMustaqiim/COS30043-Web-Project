<script>
  import Navbar from './components/Navbar.vue'

  export default {
    components: {
      Navbar
    },

    data() {
      return {
        darkMode: false
      }
    },

    mounted() {

      // load saved mode
      const saved = localStorage.getItem("darkMode");

      if (saved === "true") {

        this.darkMode = true;

        document.body.classList.add("dark-mode");

      }
    },

    methods: {
      toggleDarkMode() {
        this.darkMode = !this.darkMode;

        localStorage.setItem("darkMode", this.darkMode);

        document.body.classList.toggle("dark-mode");
      }
    }
  }
</script>

<template>
  <div>

    <Navbar :darkMode="darkMode" @toggle-dark="toggleDarkMode"/>

    <div class="container py-3">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

  </div>
</template>

<style>

</style>
