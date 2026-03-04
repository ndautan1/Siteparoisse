# PRD - Paroisse Notre Dame d'Autan

## Problème original
Site web paroissial pour Notre Dame d'Autan (Castanet-Tolosan, Saint-Orens et environs). Application full-stack React + FastAPI + MongoDB.

## Architecture
- **Frontend**: React 19, Tailwind CSS, Craco, react-router-dom v7
- **Backend**: FastAPI, MongoDB
- **Déploiement**: Railway avec Nixpacks
- **État**: React Context (DarkMode)

## Ce qui a été implémenté

### Session précédente
- Fix déploiement Railway (ESLint CI=false)
- Refonte complète du CMS (AdminDashboard)
- Mode sombre site-wide (DarkModeContext + Tailwind class strategy)
- Bouton mode sombre en position flottante

### Session actuelle (Fév 2026)
- **Bouton mode sombre en rose poudré** : FloatingButtons.js et DarkModeToggle.js utilisent maintenant `bg-gold` (#d0ada6) pour correspondre aux autres boutons
- **Lazy loading images** : `loading="lazy"` ajouté à toutes les images du site (sauf Hero qui utilise `fetchPriority="high"`)
- **Code splitting** : React.lazy + Suspense pour 22 composants de pages (seul HomePage est chargé eagerly)
- **Composant LazyImage** : Composant réutilisable avec IntersectionObserver

## Backlog priorisé

### P0 - Amélioration UX page d'accueil
Réorganiser le contenu, section "Événements à venir" dédiée, améliorer les CTA

### P1 - Calendrier interactif
Remplacer la liste statique d'événements par un calendrier dynamique et filtrable

### P2 - Lecteur de direct (streaming)
Intégrer un lecteur vidéo pour les messes/événements en direct

### P3 - Optimisation performances (FAIT)
- ✅ Lazy loading images
- ✅ Code splitting React.lazy
- Reste : optimisation images côté serveur (compression, WebP)

## Fichiers clés
- `frontend/src/App.js` - Routing + code splitting
- `frontend/src/components/FloatingButtons.js` - Boutons flottants
- `frontend/src/components/DarkModeToggle.js` - Toggle mode sombre
- `frontend/src/components/LazyImage.js` - Composant image lazy
- `frontend/src/contexts/DarkModeContext.js` - Context mode sombre
- `frontend/tailwind.config.js` - Config Tailwind (gold = #d0ada6)
