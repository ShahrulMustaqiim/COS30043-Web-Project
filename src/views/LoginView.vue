<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow" style="width: 350px;">
      <h3 class="text-center mb-3">Login</h3>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label>Email</label>
          <input type="email" v-model="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>

        <button class="btn btn-dark w-100">Login</button>
      </form>

      <p class="text-center text-danger mt-2" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
        email: "",
        password: "",
        message: ""
        }
    },
    methods: {
        async handleLogin() {
            try {
            const res = await fetch("https://cos30043-web-project-backend-production-e458.up.railway.app/login.php", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                email: this.email,
                password: this.password
                })
            });

            const data = await res.json();

            if (data.status === "success") {
                this.message = "Login successful!";
                localStorage.setItem("user", JSON.stringify({
                  name: data.name,
                  email: data.email
                }));

                window.dispatchEvent(new Event("userChanged"));
                this.$router.push("/dashboard"); 
            } else {
                this.message = data.message;
            }
            } catch (error) {
            console.error(error);
            this.message = "Server error";
            }
        }
    }
}   
</script>

<style scoped>
</style>