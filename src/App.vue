<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-btn to="/" variant="text">Home</v-btn>
        <v-btn to="/astres">Astres</v-btn>
        <v-btn to="/ImageOfTheDay" variant="text">IOTD</v-btn>
        <v-btn to="/favoris" variant="text">
          <v-icon left>mdi-star</v-icon>
          Favoris
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>

</style>