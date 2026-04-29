# MAZAR SERVICES – Site officiel

Site vitrine professionnel one-page (React + Vite) orienté conversion de demandes de devis.

## 1) Lancer en local

```bash
npm install
npm run dev
```

## 2) Build production

```bash
npm run build
```

Le dossier de sortie est `dist/`.

---

## 3) Publication sur IONOS (domaine chez IONOS)

Vous avez 2 chemins simples.

### Option A (recommandée) : héberger directement chez IONOS (hébergement web)

1. Exécuter le build en local :
   ```bash
   npm install
   npm run build
   ```
2. Dans l’espace IONOS, ouvrir **Hébergement web** > **Accès FTP**.
3. Se connecter en FTP (FileZilla par exemple) avec les identifiants IONOS.
4. Envoyer **le contenu** du dossier `dist/` vers le dossier web racine (souvent `htdocs/` ou `httpdocs/`).
5. Vérifier que `index.html` est bien à la racine du dossier public.
6. Ouvrir `https://www.mazar-services.fr`.

### Option B : Vercel/Netlify + domaine IONOS

1. Pousser le repo sur GitHub.
2. Importer le projet sur Vercel/Netlify.
3. Build command : `npm run build` ; output : `dist`.
4. Ajouter le domaine `mazar-services.fr` dans la plateforme.
5. Côté IONOS DNS, pointer les enregistrements demandés (A/CNAME) vers Vercel/Netlify.
6. Attendre la propagation DNS (quelques minutes à 24h max).

---

## 4) Formulaire de devis (important)

Les formulaires sont déjà branchés sur `formsubmit.co` vers `contact@mazar-services.fr`.

Au **premier envoi**, FormSubmit envoie un email de confirmation à `contact@mazar-services.fr` :
1. Ouvrir cet email,
2. Cliquer sur le lien d’activation,
3. Puis refaire un test.

Sans cette activation initiale, les formulaires ne livreront pas les demandes.

Si vous préférez plus tard, vous pouvez remplacer `formsubmit.co` par Netlify Forms, Formspree ou API serverless.

---

## 5) Checklist “site prêt” avant mise en ligne

- Le site charge correctement en mobile et desktop.
- Le bouton **Demander un devis** envoie bien un email.
- Le bloc **Être rappelé** envoie bien un email.
- Les pages `mentions-legales.html` et `politique-confidentialite.html` s’ouvrent.
- `robots.txt` et `sitemap.xml` sont accessibles.
- Domaine `https://www.mazar-services.fr` fonctionne en HTTPS.
