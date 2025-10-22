# DORA Diagnostic Tool

Application Next.js interactive pour identifier le profil DORA de votre équipe de software delivery.

## 📋 Vue d'ensemble

Cette application implémente les 7 profils d'équipes identifiés dans le rapport DORA 2025 :

1. **Foundational challenges** (10%) - Équipes confrontées aux défis fondamentaux
2. **The legacy bottleneck** (11%) - Équipes coincées par les systèmes hérités  
3. **Constrained by process** (17%) - Équipes limitées par des processus inefficaces
4. **High impact, low cadence** (7%) - Impact fort mais déploiements lents
5. **Stable and methodical** (15%) - Équipes stables et méthodiques
6. **Pragmatic performers** (20%) - Équipes pragmatiques hautement performantes
7. **Harmonious high-achiever** (20%) - Excellence totale - cycle vertueux

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible à `http://localhost:3000`

### Build

```bash
npm run build
```

Pour démarrer en production :
```bash
npm start
```

## 📊 Fonctionnalités

- **Diagnostic interactif** : 8 questions couvrant les 4 dimensions clés
  - Performance (lead time, deployment frequency)
  - Stabilité (recovery time, change failure rate, rework rate)
  - Qualité et bien-être (burnout, friction, travail utile)

- **Visualisation radar** : Représentation graphique du profil identifié

- **Comparaison de clusters** : Voir où votre équipe se positionne par rapport aux autres profils

- **Recommandations personnalisées** : Guidance spécifique pour progresser

## 🏗️ Architecture

```
src/
├── app/          # Pages Next.js
├── components/   # Composants React
├── data/         # Données clusters et questions
├── lib/          # Logique de diagnostic
└── styles/       # Stylesheets (Tailwind)
```

## 🎨 Stack Technologique

- **Next.js 16** - Framework React full-stack
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## 📐 Métriques DORA

L'algorithme de matching utilise 8 dimensions :

- Team Performance
- Product Performance
- Software Delivery Throughput
- Software Delivery Instability
- Valuable Work
- Friction
- Burnout
- Individual Effectiveness

Chaque réponse est pondérée et comparée au profil des 7 clusters pour identifier le match optimal.

## 📖 Références

Basé sur le rapport DORA 2025 "State of DevOps" avec les 7 profils d'équipes identifiés.

## 📝 Notes

- Les scores radar varient de 1 (faible) à 9 (excellent) par dimension
- Le résultat final montre le cluster avec le meilleur score de matching
- Les recommandations sont adaptées au profil identifié
