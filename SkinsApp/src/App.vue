<template>
  <div id="app">
    <h1>Random CS2 Skins</h1>
    <div class="skins-grid">
      <div v-for="(skin, index) in randomSkins" :key="index" class="skin-card">
        <img :src="skin.imageUrl" :alt="skin.name" />
        <h3>{{ skin.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { skins } from './skins'

export default {
  name: 'App',
  data() {
    return {
      randomSkins: [],
    }
  },
  created() {
    this.getRandomSkins()
  },
  methods: {
    getRandomSkins() {
      // Shuffle and pick 5 random skins
      this.randomSkins = skins
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 5) // Get first 5 elements
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

.skins-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
}

.skin-card {
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skin-card img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
