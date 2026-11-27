window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.fr = {
  sudoku: [
    "- Chaque ligne, chaque colonne et chaque bloc doivent contenir chaque chiffre exactement une fois.",
    "- Les chiffres dorés sont des données fixes et ne changent pas ; Vérifier signale les erreurs sans révéler la solution.",
    "- Le chronomètre démarre à votre première saisie et s'arrête dès que la grille est résolue.",
    "- Votre meilleur temps par difficulté est conservé dans ce navigateur et ne quitte jamais l'appareil."
  ],
  nonogram: [
    "- Les nombres à côté d'une ligne ou au-dessus d'une colonne donnent, dans l'ordre, les séries de cases remplies, séparées par au moins une case vide.",
    "- Marquez d'une croix les cases dont vous avez déduit qu'elles sont vides ; une case marquée ne compte jamais comme remplie et ne bloque pas la victoire.",
    "- Toute disposition qui respecte tous les indices de lignes et de colonnes est acceptée, car la vérification porte sur les indices.",
    "- La grille du jour est générée à partir de la date : elle est la même pour tout le monde aujourd'hui, et la série compte les jours consécutifs résolus."
  ],
  merge: [
    "- Un coup compte seulement si au moins une tuile change de place ou si deux tuiles fusionnent.",
    "- Deux tuiles fusionnent au plus une fois par coup : une ligne de quatre tuiles identiques fait deux paires, pas une tuile géante.",
    "- Le score est la somme des valeurs créées par les fusions : fusionner une paire de 64 ajoute 128.",
    "- Votre meilleur score est conservé dans ce navigateur sous mg-merge-best et ne quitte jamais l'appareil.",
    "- La manche se termine quand la grille est pleine et qu'aucune tuile voisine n'est égale ; Nouvelle grille remet le score à zéro."
  ],
  anagram: [
    "- 100 points pour un mot trouvé sans aide, 75 une fois l'indice révélé.",
    "- Une mauvaise réponse ne coûte que du temps : continuez jusqu'à trouver le mot ou passez.",
    "- Le meilleur total sur dix manches est conservé dans votre navigateur, et les réponses font cinq à neuf lettres, sans nom propre.",
    "- Rien n'est envoyé : le meilleur score reste dans localStorage, sur cet appareil uniquement."
  ],
  wordguess: [
    "- Six essais pour un mot de cinq lettres ; vert signifie la bonne lettre à la bonne place, orange la bonne lettre ailleurs.",
    "- Chaque essai doit être un mot que le jeu connaît, et le clavier vous prévient quand une saisie n'est pas dans la liste.",
    "- Chaque nouvelle partie choisit un nouveau mot, et votre série de victoires est conservée dans ce navigateur.",
    "- Épuiser les essais révèle le mot et termine la partie ; la série repart à zéro."
  ],
  crossword: [
    "- Dix indices par manche, tous tirés au hasard dans une réserve de vingt-six.",
    "- Dix points par bonne réponse, trois en moins par indice utilisé sur cette question, rien si tu passes.",
    "- L'orthographe compte mais pas la casse : les réponses sont comparées en majuscules, sans espaces.",
    "- Votre meilleur score est conservé sous mg-clueclues-best dans ce navigateur et ne quitte jamais l'appareil.",
    "- La manche se termine quand le chrono atteint zéro, et la case de réponse se verrouille jusqu'au prochain départ."
  ],
  pairs: [
    "- Retournez deux cartes à la fois et laissez la paire face visible quand elles correspondent.",
    "- En cas d'erreur, les cartes se retournent aussitôt : se souvenir de ce qu'on a vu fait tout le jeu.",
    "- La manche se termine quand les six paires sont trouvées ; les coups et le temps sont comptés.",
    "- Votre meilleur résultat est conservé dans ce navigateur sous une clé mg- et n'est jamais envoyé."
  ],
  sequence: [
    "- Les nombres sont des entiers de 1 à 99, tous différents, à trier par ordre croissant.",
    "- Les mots sont des mots ordinaires, tous différents, à trier par ordre alphabétique sans tenir compte de la casse.",
    "- Un clic qui n'est pas l'élément suivant compte comme une erreur et l'élément reste disponible.",
    "- Votre score est le temps de completion ; le meilleur temps par série et longueur est conservé dans ce navigateur sous mg-sort-best.",
    "- Changer de série ou de longueur lance immédiatement une nouvelle manche."
  ],
  sort: [
    "- Les nombres vont de 10 à 99, et chaque nombre appartient à une seule corbeille.",
    "- Un point par tri correct, un point perdu par erreur, jamais en dessous de zéro.",
    "- Votre plus longue série de tris corrects est mise en avant ; votre meilleur score est conservé dans ce navigateur sous mg-bins-best.",
    "- La manche se termine quand le chrono atteint zéro, et les corbeilles se verrouillent jusqu'au prochain départ.",
    "- Rien n'est téléchargé et aucune manche n'est envoyée : le score vit uniquement dans localStorage."
  ],
  math: [
    "- Facile : additions et soustractions avec des nombres jusqu'à 20.",
    "- Moyen : multiplications de 2 à 12, divisions exactes, et petites additions ou soustractions jusqu'à 30.",
    "- Difficile : multiplications jusqu'à 20, divisions exactes, et additions ou soustractions avec des nombres jusqu'à 100.",
    "- Un point par bonne réponse, sans bonus de rapidité dans la manche : c'est le chrono qui met la pression.",
    "- Votre meilleur score par difficulté est conservé dans ce navigateur sous mg-math-best.",
    "- Quand le chrono atteint zéro, la manche se termine et la saisie se verrouille jusqu'au prochain départ."
  ],
  slide: [
    "- Seule une tuile partageant un bord avec le trou peut bouger ; les voisines en diagonale ne peuvent pas.",
    "- Chaque mélange provient de quelques centaines de coups légaux depuis la grille résolue, donc une solution existe toujours.",
    "- Votre score est le nombre de coups, avec le temps comme départage pour vos propres records.",
    "- Le meilleur nombre de coups par taille de grille est conservé dans ce navigateur sous mg-slide-best.",
    "- Mélanger lance une nouvelle grille, remet les compteurs à zéro et garde le meilleur score."
  ],
  pattern: [
    "- Cinq suites par jour, un essai chacune, toujours avec des réponses entières.",
    "- Les réponses ne peuvent être négatives que dans la série de soustractions, et même là la suite reste au-dessus de zéro.",
    "- Votre meilleur jour est le plus grand nombre de bonnes réponses sur cinq, conservé sous mg-pattern-best.",
    "- La série quotidienne est conservée sous mg-pattern-streak et compte les jours consécutifs où vous avez terminé le set.",
    "- Relancer rejoue les cinq grilles du jour ; aucune nouvelle n'est générée."
  ],
  codebreak: [
    "- Facile : trois chiffres de 1 à 5, sans répétition, huit essais.",
    "- Moyen : quatre chiffres de 1 à 6, répétitions autorisées, dix essais.",
    "- Difficile : cinq chiffres de 1 à 8, répétitions autorisées, douze essais.",
    "- Vous gagnez en trouvant le code exact ; votre score est le nombre d'essais, et le meilleur score par difficulté est conservé dans votre navigateur.",
    "- Épuiser les essais révèle le code, la manche compte comme une défaite et le meilleur score n'est pas touché."
  ]
};
