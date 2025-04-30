# Application d'Exploration Spatiale

## Aperçu
Une application Vue.js qui fournit des informations sur les corps célestes de notre système solaire, proposant :
- Une visualisation interactive du système solaire
- Des informations détaillées sur les planètes et leurs lunes
- L'image du jour de la NASA
- Une liste complète des corps célestes avec options de filtrage

## Technologies Utilisées
- Vue.js 3
- Vuetify 3
- Vue Router
- API Solar System OpenData
- API NASA APOD

## Prérequis
- Node.js
- npm 

## Installation

1. Cloner le dépôt
```bash
git clone https://gitlab.com/enzo.reine35/nasa.git
cd nasa
```

2. Installer les dépendances
```bash
npm install
```

3. Créer le fichier d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez votre clé API NASA :
```
VUE_APP_NASA_API_KEY=votre_clé_api_ici
```

4. Lancer le serveur de développement
```bash
npm run serve
```

## Scripts Disponibles
- `npm run serve` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run lint` - Vérifie et corrige les fichiers

## Fonctionnalités

### Visualisation du Système Solaire
- Vue interactive du système solaire
- Trois modes de visualisation :
  - WIDTH : Affiche les planètes selon leurs tailles relatives
  - SPEED : Montre les vitesses orbitales des planètes
  - DISTANCE : Visualise les distances relatives par rapport au Soleil

### Détails des Planètes
- Données en temps réel depuis l'API Solar System OpenData
- Informations incluant :
  - Diamètre
  - Période de rotation
  - Distance du Soleil
  - Gravité
  - Densité
  - Nombre de lunes
  - Température moyenne

### Liste des Corps Célestes
- Liste complète de tous les corps du système solaire
- Options de filtrage :
  - Afficher uniquement les planètes
  - Afficher uniquement les corps avec des lunes
- Vue détaillée pour chaque corps céleste

### Image NASA du Jour
- Images astronomiques quotidiennes de la NASA
- Inclut descriptions détaillées et crédits

## Références API
- Solar System OpenData : https://api.le-systeme-solaire.net/rest/bodies/
- NASA APOD : https://api.nasa.gov



## Auteur
-Enzo REINE

@SylvainGarnot sur codepen.io pour le style du système solaire