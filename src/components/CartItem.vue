<template>
  <div class="card mb-2 p-2">
    <div class="d-flex justify-content-between align-items-center">
      
      <div>
        <h6 class="mb-1">{{ item.name }}</h6>
        <small class="text-muted">
          RM{{ Number(item.price).toFixed(2) }}
        </small>
      </div>

      <button class="btn btn-danger btn-sm" @click="$emit('remove')">
        Remove
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: Object
  }
}
</script>

<style scoped>
.card {
  transition: 0.2s;
}

.card:hover {
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}
</style>