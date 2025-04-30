<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-btn to="/" variant="text">Home</v-btn>
        <v-btn to="/astres">Astres</v-btn>
        <v-btn to="/ImageOfTheDay" variant="text">IOTD</v-btn>
        
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>
html, body {
  overflow-y: initial;
  height: 100%;
}

.v-application {
  height: 100vh;
}

.main-content {
  height: 100%;
  overflow-y: auto;
}
</style>