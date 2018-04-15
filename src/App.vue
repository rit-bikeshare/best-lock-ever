<template>
  <div id="app">
    <lock-state :state="lock.state"/>
    <div>
      <button v-if="lock.state == 'locked'" @click="lock.unlock()">Unlock</button>
      <button v-else-if="lock.state == 'unlocked'" @click="lock.lock()">Lock</button>
    </div>
  </div>
</template>

<script>
import Lock from './lock'
import LockState from './components/LockState'

export default {
  name: 'App',
  components: {
    LockState
  },
  data() {
    return {
      lock: new Lock()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
