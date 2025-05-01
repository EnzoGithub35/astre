<template>
  <div class="iotd-container">
    <div class="home">
      <h1>NASA</h1>
      <div v-if="loading" class="loading-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else class="nasa-content">
        <h2>{{ title }}</h2>
        <img :src="imageUrl" :alt="title" class="nasa-image"/>
        <p>{{ explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const API_KEY = process.env.VUE_APP_NASA_API_KEY || 'DEMO_KEY';

export default {
  name: 'HomeView',
  data() {
    return {
      loading: true,
      imageUrl: '',
      title: '',
      explanation: '',
    }
  },
  methods: {
    async fetchNasaImage() {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
        );
        const data = await response.json();
        this.imageUrl = data.url;
        this.title = data.title;
        this.explanation = data.explanation;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching NASA image:', error);
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchNasaImage();
  }
}
</script>

<style scoped>
.iotd-container {
  height: calc(100vh - 64px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.iotd-container::-webkit-scrollbar {
  width: 8px;
}

.iotd-container::-webkit-scrollbar-track {
  background: transparent;
}

.iotd-container::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 4px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.nasa-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.nasa-image {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

h1 {
  text-align: center;
  padding: 20px 0;
  color: #333;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}
</style>