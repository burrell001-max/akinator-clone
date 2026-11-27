window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.nl = {
  sudoku: [
    "- Elke rij, elke kolom en elk blok moeten elk cijfer precies één keer bevatten.",
    "- Gouden cijfers staan vast en veranderen niet; Controleren markeert fouten zonder de oplossing te verklappen.",
    "- De timer start bij je eerste invoer en stopt op het moment dat het rooster is opgelost.",
    "- Je beste tijd per moeilijkheid blijft in deze browser en verlaat het apparaat nooit."
  ],
  nonogram: [
    "- Getallen naast een rij of boven een kolom geven op volgorde de reeksen gevulde vakjes, met minstens één leeg vakje ertussen.",
    "- Markeer vakjes waarvan je hebt afgeleid dat ze leeg zijn met het kruis; een gemarkeerd vakje telt nooit als gevuld en houdt een overwinning niet tegen.",
    "- Elke indeling die aan alle rij- en kolomaanwijzingen voldoet, geldt als opgelost, want de controle gaat over de aanwijzingen.",
    "- Het dagrooster komt uit de datum, is vandaag dus voor iedereen gelijk, en de reeks telt opeenvolgende opgeloste dagen."
  ],
  merge: [
    "- Een zet telt alleen als minstens één tegel van plek verandert of twee tegels samensmelten.",
    "- Twee tegels smelten hoogstens één keer per zet samen, dus vier gelijke in een rij geven twee paren en geen reuzentegel.",
    "- De score is de som van elke waarde die door een samensmelting ontstaat: een paar van 64 levert 128 op.",
    "- Je beste score staat in deze browser onder mg-merge-best en verlaat het apparaat nooit.",
    "- De ronde eindigt wanneer het bord vol is en geen twee buren meer gelijk zijn; Nieuw bord zet de score op nul."
  ],
  anagram: [
    "- 100 punten voor een woord dat je zonder hulp oplost, 75 zodra de aanwijzing onthuld is.",
    "- Een foute gok kost alleen tijd: blijf proberen tot je het hebt of sla over.",
    "- Het beste totaal over tien rondes staat in je browser, en antwoorden hebben vijf tot negen letters zonder eigennamen.",
    "- Er wordt niets geüpload: de beste score leeft alleen in localStorage op dit apparaat."
  ],
  wordguess: [
    "- Zes pogingen voor een woord van vijf letters; groen is de juiste letter op de juiste plek, geel de juiste letter ergens anders.",
    "- Elke gok moet een woord zijn dat het spel kent, dus het toetsenbord laat zien wanneer een invoer niet in de lijst staat.",
    "- Elk nieuw spel kiest een nieuw woord, en je reeks overwinningen blijft in deze browser.",
    "- Zijn de pogingen op, dan wordt het woord onthuld en eindigt het spel; de reeks begint opnieuw."
  ],
  crossword: [
    "- Tien aanwijzingen per ronde, allemaal willekeurig uit een voorraad van zesentwintig.",
    "- Tien punten per goed antwoord, drie eraf voor elke hint bij die aanwijzing, niets voor overslaan.",
    "- Spelling telt, hoofdletters niet: antwoorden worden vergeleken in hoofdletters en zonder spaties.",
    "- Je beste score staat onder mg-clueclues-best in deze browser en verlaat het apparaat nooit.",
    "- De ronde eindigt bij nul op de klok, en het antwoordvak blijft op slot tot je opnieuw start."
  ],
  pairs: [
    "- Draai twee kaarten tegelijk om en laat een paar open liggen als ze bij elkaar horen.",
    "- Passen ze niet, dan draaien ze meteen terug; onthouden wat je zag is het hele spel.",
    "- De ronde eindigt wanneer alle zes paren gevonden zijn; zetten en tijd worden beide geteld.",
    "- Je beste resultaat staat in deze browser onder een mg- sleutel en wordt nooit geüpload."
  ],
  sequence: [
    "- Getallen zijn hele getallen van 1 tot 99, allemaal verschillend, oplopend te sorteren.",
    "- Woorden zijn gewone woorden, allemaal verschillend, alfabetisch te sorteren zonder op hoofdletters te letten.",
    "- Een klik die niet het volgende item is telt als fout en het item blijft beschikbaar.",
    "- Je score is de tijd tot de finish; de beste tijd per set en lengte staat in deze browser onder mg-sort-best.",
    "- Van set of lengte wisselen start meteen een nieuwe ronde."
  ],
  sort: [
    "- Getallen lopen van 10 tot 99, en elk getal hoort in precies één bak.",
    "- Eén punt per goede sortering, één punt eraf per fout, nooit onder nul.",
    "- Je langste reeks goede sorteringen wordt bijgehouden; je beste score staat in deze browser onder mg-bins-best.",
    "- De ronde eindigt bij nul op de klok, en de bakken blijven op slot tot je opnieuw start.",
    "- Er wordt niets opgehaald en geen ronde geüpload: de score leeft alleen in localStorage."
  ],
  math: [
    "- Makkelijk: optellen en aftrekken met getallen tot 20.",
    "- Gemiddeld: tafels van 2 tot 12, delingen die precies uitkomen, en kleine sommen of verschillen tot 30.",
    "- Moeilijk: tafels tot 20, delingen die precies uitkomen, en sommen of verschillen met getallen tot 100.",
    "- Eén punt per goed antwoord, geen bonus voor snelheid binnen de ronde — de klok is de druk.",
    "- Je beste score per moeilijkheid staat in deze browser onder mg-math-best.",
    "- Als de klok nul bereikt, eindigt de ronde en blijft de invoer op slot tot je opnieuw start."
  ],
  slide: [
    "- Alleen een tegel die een rand met het gat deelt kan bewegen; diagonale buren niet.",
    "- Elke schudbeurt komt uit een paar honderd toegestane zetten vanaf het opgeloste bord, dus er is altijd een oplossing.",
    "- Je score is het aantal zetten; bij gelijkstand in je eigen records beslist de tijd.",
    "- Het beste aantal zetten per bordgrootte staat in deze browser onder mg-slide-best.",
    "- Schudden start een nieuw bord, zet de tellers op nul en houdt de beste score."
  ],
  pattern: [
    "- Vijf reeksen per dag, elk één poging, altijd met hele getallen als antwoord.",
    "- Antwoorden mogen alleen in de aftrekreeks negatief zijn, en ook daar blijft de reeks boven nul.",
    "- Je beste dag is het hoogste aantal goede antwoorden van de vijf, opgeslagen onder mg-pattern-best.",
    "- De dagreeks staat onder mg-pattern-streak en telt opeenvolgende dagen waarop je de set afmaakte.",
    "- Opnieuw beginnen speelt de vijf puzzels van vandaag opnieuw; er worden geen nieuwe gemaakt."
  ],
  codebreak: [
    "- Makkelijk: drie cijfers van 1 tot 5, geen herhaling, acht pogingen.",
    "- Gemiddeld: vier cijfers van 1 tot 6, herhaling toegestaan, tien pogingen.",
    "- Moeilijk: vijf cijfers van 1 tot 8, herhaling toegestaan, twaalf pogingen.",
    "- Je wint als de code precies klopt; je score is het aantal gebruikte pogingen, en de beste score per moeilijkheid blijft in je browser.",
    "- Zijn de pogingen op, dan wordt de code onthuld, telt de ronde als verlies en blijft je beste score staan."
  ]
};
