<template>
  <v-container class="astre-details">
    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else-if="error" class="text-center">
      <v-alert type="error">{{ error }}</v-alert>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12">
          <v-btn @click="$router.go(-1)" color="primary" class="mb-4">
            <v-icon left>mdi-arrow-left</v-icon> Retour
          </v-btn>
          <h1 class="text-h3">{{ astre.englishName }}</h1>
          <v-chip color="primary" class="mr-2">
            {{ astre.isPlanet ? 'Planète' : astre.bodyType }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Caractéristiques physiques</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Masse</v-list-item-title>
                  <v-list-item-subtitle v-if="astre.mass">
                    {{ astre.mass.massValue }}×10^{{ astre.mass.massExponent }} kg
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Gravité</v-list-item-title>
                  <v-list-item-subtitle>{{ astre.gravity }} m/s²</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Rayon moyen</v-list-item-title>
                  <v-list-item-subtitle>{{ astre.meanRadius }} km</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Densité</v-list-item-title>
                  <v-list-item-subtitle>{{ astre.density }} g/cm³</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Caractéristiques orbitales</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Période orbitale</v-list-item-title>
                  <v-list-item-subtitle>{{ astre.sideralOrbit }} jours</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Période de rotation</v-list-item-title>
                  <v-list-item-subtitle>{{ astre.sideralRotation }} heures</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>


      <v-row v-if="astre.moons && astre.moons.length > 0">
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Lunes ({{ astre.moons.length }})
            </v-card-title>
            <v-card-text>
              <v-chip-group>
                <v-chip
                  v-for="moon in astre.moons"
                  :key="moon.moon"
                  @click="navigateToMoon(moon.rel)"
                  color="secondary"
                  class="ma-1"
                >
                  {{ moon.moon }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'AstreDetailsView',
  data() {
    return {
      astre: null,
      loading: true,
      error: null
    }
  },
  methods: {
    async fetchAstreDetails() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${this.$route.params.id}`)
        if (!response.ok) {
          throw new Error('Astre non trouvé')
        }
        this.astre = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    navigateToMoon(moonRel) {
      const moonId = moonRel.split('/').pop()
      this.$router.push(`/astre/${moonId}`)
    }
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.fetchAstreDetails()
      },
      immediate: true 
    }
  }
}
</script>

<style scoped>
.astre-details {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>