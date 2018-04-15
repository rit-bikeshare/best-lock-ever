<template>
  <div class="lock-state">
    <span :class="state">{{ state }}</span>
  </div>
</template>

<script>
export default {
  name: 'LockState',
  props: {
    'state': {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.lock-state {
  text-transform: uppercase;
}

.unlocked {
  color: darkred;
}

.locked {
  color: forestgreen;
}

.locking, .unlocking {
  color: goldenrod;
}
</style>
