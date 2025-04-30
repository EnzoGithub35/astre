<template>
  <v-container class="favoris-container">
    <h1 class="text-h3 mb-6">Mes Favoris</h1>

    <div v-if="!favoriteAstres.length" class="text-center">
      <p class="text-h6">Aucun favori pour le moment</p>
      <v-btn color="primary" class="mt-4" to="/astres">
        Découvrir les astres
      </v-btn>
    </div>

    <v-row v-else>
      <v-col v-for="astre in favoriteAstres" 
             :key="astre.id" 
             cols="12" sm="6" md="4">
        <v-card @click="navigateToAstre(astre)" class="h-100">
          <v-card-title>{{ astre.englishName }}</v-card-title>
          <v-card-subtitle>
            Type: {{ astre.isPlanet ? 'Planète' : astre.bodyType }}
          </v-card-subtitle>
          <v-card-text>
            <div v-if="astre.moons">
              Nombre de lunes: {{ astre.moons?.length || 0 }}
            </div>
            <div>Gravité: {{ astre.gravity }} m/s²</div>
            <div>Rayon moyen: {{ astre.meanRadius }} km</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text">
              Voir les détails
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              icon
              @click.stop="removeFavorite(astre)"
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FavorisView',
  data() {
    return {
      favoriteAstres: []
    }
  },
  methods: {
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.favoriteAstres = favorites;
    },
    removeFavorite(astre) {
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites = favorites.filter(fav => fav.id !== astre.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.loadFavorites();
    },
    navigateToAstre(astre) {
      this.$router.push(`/astre/${astre.id}`);
    },
    isAstreFavorite(astreId) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.some(fav => fav.id === astreId);
    },
    toggleFavorite(astre) {
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const index = favorites.findIndex(fav => fav.id === astre.id);
      
      if (index === -1) {
        favorites.push(astre);
      } else {
        favorites.splice(index, 1);
      }
      
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  },
  mounted() {
    this.loadFavorites();
  }
}
</script>

<style scoped>
.favoris-container {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.favoris-container::-webkit-scrollbar {
  width: 8px;
}

.favoris-container::-webkit-scrollbar-track {
  background: transparent;
}

.favoris-container::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 4px;
}

.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
</style>