<template>
  <div id="app">
    <div>
      <div>
        Connection URL: <input type="text" v-model="address"/>
      </div>
      <div>
        Lock ID: <input type="text" v-model="lock.id" />
      </div>
      <div>
        <button v-if="!lock.ws.socket || lock.ws.socket.readyState >= 2" @click="lock.connect(address + '/' + lock.id)">Connect</button>
        <button v-else @click="lock.disconnect()">Disconnect</button>
      </div>
    </div>
    <hr/>
    <lock-state :state="lock.state"/>
    <div>
      <button v-if="lock.state == 'locked'" @click="lock.unlock()">Unlock</button>
      <button v-else-if="lock.state == 'unlocked'" @click="lock.lock()">Lock</button>
    </div>
    <hr/>
    <div>
      Location: 
      <select v-model="location" @change="lock.updateLocation({ lat: location.lat, lon: location.lon })">
        <option disabled value="">Select a bike location</option>
        <option :key="option.text" v-for="option in lock.locationOptions" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
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
      location: null,
      lock: new Lock(),
      address: 'wss://bikesharedev.rit.edu/api/ws/lock/register'
    }
  },
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
