# gestion-match-hand

Application web pour gérer un match de handball en temps réel :
- terrain
- banc
- blessures
- temps de jeu
- remplacements
- alertes automatiques

## 🎯 Problème
Lors des matchs amateurs, il est difficile de :
- suivre les temps de jeu
- gérer les remplacements
- savoir quand faire tourner l’effectif

Cette application aide le coach à prendre de meilleures décisions.

## ⚙️ Fonctionnalités
- Chronomètre de match
- Gestion du terrain (7 joueurs)
- Gestion du banc
- Remplacements manuels
- Blessures (sortie définitive + remplacement)
- Calcul du temps de jeu
- Alerte sonore quand aucun changement n’a eu lieu depuis trop longtemps

## 🛠️ Technologies
- JavaScript vanilla
- HTML
- CSS

## 🧠 Architecture
- Les joueurs sont modélisés comme des objets
- Le moteur gère plusieurs états :
  - terrain
  - banc
  - temps de jeu
  - événements (blessures, changements)

## 🚀 Objectif
Application conçue pour être utilisée pendant un vrai match de handball.


