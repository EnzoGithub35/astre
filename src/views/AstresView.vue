<template>
  <v-container class="astres-container">
    <h1 class="text-h3 mb-6">Liste des Astres</h1>

    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-switch
          v-model="filters.isPlanet"
          label="Afficher uniquement les planètes"
          color="primary"
        ></v-switch>
        <v-switch
          v-model="filters.hasMoons"
          label="Afficher uniquement les astres avec lunes"
          color="primary"
        ></v-switch>
      </v-col>
    </v-row>


    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

 
    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>


    <v-row>
      <v-col v-for="astre in filteredAstres" 
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
              :color="isAstreFavorite(astre.id) ? 'warning' : 'grey'"
              icon
              @click.stop="toggleFavorite(astre)"
            >
              <v-icon>{{ isAstreFavorite(astre.id) ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

 
    <v-dialog v-model="dialog" max-width="800">
      <v-card v-if="selectedAstre">
        <v-card-title>{{ selectedAstre.englishName }}</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-title>Type:</v-list-item-title>
              <v-list-item-subtitle>
                {{ selectedAstre.isPlanet ? 'Planète' : selectedAstre.bodyType }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Gravité:</v-list-item-title>
              <v-list-item-subtitle>{{ selectedAstre.gravity }} m/s²</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Rayon moyen:</v-list-item-title>
              <v-list-item-subtitle>{{ selectedAstre.meanRadius }} km</v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="selectedAstre.moons">
              <v-list-item-title>Lunes:</v-list-item-title>
              <v-list-item-subtitle>
                {{ selectedAstre.moons?.length || 0 }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      astres: [],
      loading: true,
      error: null,
      filters: {
        isPlanet: false,
        hasMoons: false
      },
      dialog: false,
      selectedAstre: null,
      favorites: [], // Ajout d'un state local pour les favoris
    }
  },

  computed: {
    filteredAstres() {
      return this.astres.filter(astre => {
        if (this.filters.isPlanet && !astre.isPlanet) return false;
        if (this.filters.hasMoons && (!astre.moons || astre.moons.length === 0)) return false;
        return true;
      });
    }
  },

  methods: {
    isAstreFavorite(astreId) {
      return this.favorites.some(fav => fav.id === astreId);
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
      this.favorites = favorites; // Met à jour le state local
      this.$forceUpdate(); // Force la mise à jour du composant
    },

    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    },

    async fetchAstres() {
      try {
        const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        const data = await response.json()
        this.astres = data.bodies
        this.loading = false
      } catch (error) {
        this.error = "Erreur lors du chargement des astres"
        this.loading = false
        console.error('Error:', error)
      }
    },
    
    showAstreDetails(astre) {
      this.selectedAstre = astre
      this.dialog = true
    },
    
    navigateToAstre(astre) {
      this.$router.push(`/astre/${astre.id}`)
    }
  },
  mounted() {
    this.fetchAstres();
    this.loadFavorites(); // Charge les favoris au montage du composant
  }
}
</script>

<style scoped>
.astres-container {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.astres-container::-webkit-scrollbar {
  width: 8px;
}

.astres-container::-webkit-scrollbar-track {
  background: transparent;
}

.astres-container::-webkit-scrollbar-thumb {
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