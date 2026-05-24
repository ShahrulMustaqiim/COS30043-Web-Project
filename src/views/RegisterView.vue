<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow" style="width: 350px;">
      <h3 class="text-center mb-3">Register</h3>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label>Name</label>
          <input type="text" v-model="name" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Email</label>
          <input type="email" v-model="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label>Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>

        <button class="btn btn-dark w-100">Register</button>
      </form>

      <p class="text-center mt-2" v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "RegisterView",
    data() {
        return {
        name: "",
        email: "",
        password: "",
        message: ""
        }
    },
    methods: {
        async handleRegister() {
            console.log("FUNCTION TRIGGERED");

            try {
                const response = await fetch("http://localhost:8080/food-api/register.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                });

                const text = await response.text();
                console.log("RAW RESPONSE:", text);

                const data = JSON.parse(text);

                if (data.status === "success") {
                    this.message = "Registration successful!";
                } else {
                    this.message = data.message || "Registration failed!";
                }

            }catch (error) {
                console.error("ERROR:", error);
                this.message = "Server error";
            }
        }
    }
}
</script>

<style scoped>
</style>