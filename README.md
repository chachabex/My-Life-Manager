# Life OS – Chacha (PWA)

Organisateur tout-en-un (journal, permis, business, maison, budget, sécurité). Installable comme **appli** (PWA), fonctionne **hors-ligne**.

## Étapes rapides (Vercel)

1. Crée un compte gratuit sur **vercel.com**.
2. Sur GitHub, crée un dépôt vide `lifeos-chacha` puis **uploade** tous les fichiers de ce dossier (glisser-déposer depuis l'explorateur).
3. Sur Vercel → **Add New** → **Project** → **Import Git Repository** → choisis `lifeos-chacha` → **Deploy**.
4. Ouvre l'URL déployée → menu du navigateur → **Ajouter à l'écran d'accueil** (Android/PC) / via Safari **Sur l’écran d’accueil** (iPhone).

> Pas besoin d'installer Node en local : Vercel fait le **build** automatiquement.

## Scripts

- `npm run dev` – lancer en local (si tu veux)
- `npm run build` – build production (Vite)
- `npm run preview` – prévisualiser le build

## Données

Stockées en **localStorage** (privé à chaque appareil). Utilise **Exporter/Importer** dans l'app pour transférer entre appareils.

— Généré le 2025-08-13
