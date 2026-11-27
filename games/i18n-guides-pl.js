window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.pl = {
  sudoku: [
    "- Każdy wiersz, każda kolumna i każdy blok muszą zawierać każdą cyfrę dokładnie raz.",
    "- Złote cyfry są danymi i nie zmieniają się; Sprawdź zaznacza błędy, nie zdradzając rozwiązania.",
    "- Stoper rusza przy pierwszym wpisie i zatrzymuje się w chwili rozwiązania siatki.",
    "- Twój najlepszy czas dla każdego poziomu zostaje w tej przeglądarce i nigdy nie opuszcza urządzenia."
  ],
  nonogram: [
    "- Liczby obok wiersza lub nad kolumną podają po kolei ciągi wypełnionych pól, oddzielone co najmniej jednym pustym polem.",
    "- Zaznaczaj krzyżykiem pola, o których wiesz, że są puste; zaznaczone pole nigdy nie liczy się jako wypełnione i nie blokuje zwycięstwa.",
    "- Każdy układ spełniający wszystkie wskazówki wierszy i kolumn liczy się jako rozwiązany, bo sprawdzane są wskazówki.",
    "- Dzienna siatka powstaje z daty, więc dziś jest taka sama dla wszystkich, a seria liczy kolejne rozwiązane dni."
  ],
  merge: [
    "- Ruch liczy się tylko wtedy, gdy co najmniej jeden kafelek zmieni miejsce lub dwa kafelki się połączą.",
    "- Dwa kafelki łączą się najwyżej raz na ruch, więc cztery równe w rzędzie dają dwie pary, a nie jeden wielki kafelek.",
    "- Wynik to suma wartości powstałych z połączeń: połączenie pary 64 dodaje 128.",
    "- Twój najlepszy wynik jest zapisany w tej przeglądarce pod mg-merge-best i nigdy nie opuszcza urządzenia.",
    "- Runda kończy się, gdy plansza jest pełna i żadne dwa sąsiednie kafelki nie są równe; Nowa plansza zeruje wynik."
  ],
  anagram: [
    "- 100 punktów za słowo odgadnięte bez pomocy, 75 po odkryciu wskazówki.",
    "- Błędna próba kosztuje tylko czas: próbuj dalej, aż trafisz, albo pomiń.",
    "- Najlepszy wynik z dziesięciu rund zostaje w twojej przeglądarce, a odpowiedzi mają od pięciu do dziewięciu liter i żadnych nazw własnych.",
    "- Nic nie jest wysyłane: najlepszy wynik żyje wyłącznie w localStorage na tym urządzeniu."
  ],
  wordguess: [
    "- Sześć prób na pięcioliterowe słowo; zielony to dobra litera na dobrym miejscu, bursztynowy dobra litera gdzie indziej.",
    "- Każda próba musi być słowem znanym grze, więc klawiatura pokazuje, gdy wpisu nie ma na liście.",
    "- Każda nowa gra losuje nowe słowo, a twoja seria zwycięstw zostaje w tej przeglądarce.",
    "- Gdy skończą się próby, słowo zostaje odkryte, a gra się kończy; seria zaczyna się od nowa."
  ],
  crossword: [
    "- Dziesięć wskazówek na rundę, wszystkie losowane z banku dwudziestu sześciu.",
    "- Dziesięć punktów za poprawną odpowiedź, trzy mniej za każdą podpowiedź przy tym haśle, nic za pominięcie.",
    "- Pisownia ma znaczenie, wielkość liter nie: odpowiedzi porównuje się wielkimi literami i bez spacji.",
    "- Najlepszy wynik jest zapisany pod mg-clueclues-best w tej przeglądarce i nigdy nie opuszcza urządzenia.",
    "- Runda kończy się, gdy zegar dojdzie do zera, a pole odpowiedzi blokuje się do następnego startu."
  ],
  pairs: [
    "- Odkrywaj dwie karty naraz i zostawiaj parę odkrytą, gdy obie pasują.",
    "- Jeśli nie pasują, po chwili wracają na drugą stronę, więc zapamiętanie tego, co widziałeś, to cała gra.",
    "- Runda kończy się, gdy znajdziesz wszystkie sześć par; liczone są ruchy i czas.",
    "- Twój najlepszy wynik jest w tej przeglądarce pod kluczem mg- i nigdy nie jest wysyłany."
  ],
  sequence: [
    "- Liczby to całkowite od 1 do 99, wszystkie różne, do ułożenia rosnąco.",
    "- Słowa to zwykłe wyrazy, wszystkie różne, do ułożenia alfabetycznie bez względu na wielkość liter.",
    "- Kliknięcie, które nie jest kolejnym elementem, liczy się jako błąd, a element zostaje w puli.",
    "- Twój wynik to czas ukończenia; najlepszy czas dla każdego zestawu i długości jest w tej przeglądarce pod mg-sort-best.",
    "- Zmiana zestawu lub długości od razu zaczyna nową rundę."
  ],
  sort: [
    "- Liczby idą od 10 do 99, a każda należy do dokładnie jednego pojemnika.",
    "- Punkt za każde poprawne posortowanie i punkt mniej za każdy błąd, nigdy poniżej zera.",
    "- Twoja najdłuższa poprawna seria jest pokazywana jako streak; najlepszy wynik jest w tej przeglądarce pod mg-bins-best.",
    "- Runda kończy się, gdy zegar dojdzie do zera, a pojemniki blokują się do następnego startu.",
    "- Nic nie jest pobierane i żadna runda nie jest wysyłana: wynik żyje wyłącznie w localStorage."
  ],
  math: [
    "- Łatwy: dodawanie i odejmowanie na liczbach do 20.",
    "- Średni: mnożenie od 2 do 12, dzielenie bez reszty oraz małe dodawanie lub odejmowanie do 30.",
    "- Trudny: mnożenie do 20, dzielenie bez reszty oraz dodawanie lub odejmowanie na liczbach do 100.",
    "- Punkt za każdą poprawną odpowiedź, bez bonusu za szybkość w rundzie — presję tworzy zegar.",
    "- Twój najlepszy wynik dla każdego poziomu jest w tej przeglądarce pod mg-math-best.",
    "- Gdy zegar dojdzie do zera, runda się kończy, a wpisywanie blokuje się do następnego startu."
  ],
  slide: [
    "- Przesunąć można tylko kafelek stykający się bokiem z pustym polem; sąsiedzi po przekątnej nie mogą.",
    "- Każde tasowanie powstaje z kilkuset legalnych ruchów z rozwiązanej planszy, więc rozwiązanie zawsze istnieje.",
    "- Twój wynik to liczba ruchów, a czas rozstrzyga remisy w twoich własnych rekordach.",
    "- Najlepsza liczba ruchów dla każdego rozmiaru planszy jest w tej przeglądarce pod mg-slide-best.",
    "- Tasowanie zaczyna nową planszę, zeruje liczniki i zachowuje najlepszy wynik."
  ],
  pattern: [
    "- Pięć ciągów dziennie, po jednej próbie na każdy, zawsze z całkowitymi odpowiedziami.",
    "- Odpowiedzi mogą być ujemne tylko w zestawie odejmowania, a i tam ciąg pozostaje powyżej zera.",
    "- Twój najlepszy dzień to największa liczba poprawnych odpowiedzi z pięciu, zapisana pod mg-pattern-best.",
    "- Seria dzienna jest zapisana pod mg-pattern-streak i liczy kolejne dni, w których ukończyłeś zestaw.",
    "- Restart rozgrywa dzisiejsze pięć łamigłówek; nie tworzy nowych."
  ],
  codebreak: [
    "- Łatwy: trzy cyfry od 1 do 5, bez powtórzeń, osiem prób.",
    "- Średni: cztery cyfry od 1 do 6, powtórzenia dozwolone, dziesięć prób.",
    "- Trudny: pięć cyfr od 1 do 8, powtórzenia dozwolone, dwanaście prób.",
    "- Wygrywasz, trafiając dokładnie w kod; wynik to liczba użytych prób, a najlepszy wynik dla każdego poziomu zostaje w twojej przeglądarce.",
    "- Gdy skończą się próby, kod zostaje odkryty, runda liczy się jako przegrana, a rekord pozostaje bez zmian."
  ]
};
