window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.pt = {
  sudoku: [
    "- Cada linha, cada coluna e cada bloco devem conter cada dígito exatamente uma vez.",
    "- Os dígitos dourados são dados fixos e não mudam; Verificar marca os erros sem revelar a solução.",
    "- O cronómetro começa com a tua primeira entrada e para no momento em que a grelha fica resolvida.",
    "- O teu melhor tempo por dificuldade fica neste navegador e nunca sai do dispositivo."
  ],
  nonogram: [
    "- Os números ao lado de uma linha ou por cima de uma coluna indicam, por ordem, as séries de células preenchidas, com pelo menos um espaço entre elas.",
    "- Marca com a cruz as células que deduziste estarem vazias; uma célula marcada nunca conta como preenchida e não impede a vitória.",
    "- Qualquer disposição que cumpra todas as pistas de linhas e colunas conta como resolvida, porque a verificação é feita sobre as pistas.",
    "- A grelha diária é gerada a partir da data, por isso hoje é igual para todos, e a sequência conta os dias consecutivos resolvidos."
  ],
  merge: [
    "- Uma jogada só conta se pelo menos uma peça mudar de posição ou duas peças se fundirem.",
    "- Duas peças fundem-se no máximo uma vez por jogada, por isso quatro peças iguais em linha dão dois pares e não uma peça gigante.",
    "- A pontuação é a soma de cada valor criado por uma fusão: fundir um par de 64 acrescenta 128.",
    "- A tua melhor pontuação fica neste navegador com a chave mg-merge-best e nunca sai do dispositivo.",
    "- A ronda termina quando o tabuleiro está cheio e não há duas peças vizinhas iguais; Novo tabuleiro repõe a pontuação."
  ],
  anagram: [
    "- 100 pontos por uma palavra resolvida sem ajuda, 75 quando a pista já foi revelada.",
    "- Uma tentativa falhada custa apenas tempo: continua a tentar até acertar ou salta.",
    "- O melhor total em dez rondas fica no teu navegador, e as respostas têm de cinco a nove letras e nenhum nome próprio.",
    "- Nada é enviado: a melhor pontuação vive só no localStorage deste dispositivo."
  ],
  wordguess: [
    "- Seis tentativas para uma palavra de cinco letras; verde é a letra certa no lugar certo, âmbar a letra certa noutro lugar.",
    "- Cada tentativa tem de ser uma palavra que o jogo conheça, por isso o teclado avisa quando uma entrada não está na lista.",
    "- Cada novo jogo escolhe outra palavra, e a tua sequência de vitórias fica neste navegador.",
    "- Ficar sem tentativas revela a palavra e termina o jogo; a sequência recomeça."
  ],
  crossword: [
    "- Dez pistas por ronda, todas tiradas ao acaso de um banco de vinte e seis.",
    "- Dez pontos por resposta certa, três a menos por cada pista usada nessa pergunta e nada por saltar.",
    "- A ortografia conta, as maiúsculas não: as respostas são comparadas em maiúsculas e sem espaços.",
    "- A tua melhor pontuação fica com a chave mg-clueclues-best neste navegador e nunca sai do dispositivo.",
    "- A ronda termina quando o relógio chega a zero, e a caixa de resposta fica bloqueada até recomeçares."
  ],
  pairs: [
    "- Vira duas cartas de cada vez e deixa o par virado para cima quando as duas coincidem.",
    "- Se não coincidirem, voltam a virar-se logo a seguir, por isso recordar o que viste é o jogo todo.",
    "- A ronda termina quando os seis pares estão encontrados; contam-se jogadas e tempo.",
    "- O teu melhor resultado fica neste navegador com uma chave mg- e nunca é enviado para lado nenhum."
  ],
  sequence: [
    "- Os números são inteiros de 1 a 99, todos diferentes, para ordenar de forma crescente.",
    "- As palavras são palavras comuns, todas diferentes, para ordenar alfabeticamente sem distinguir maiúsculas.",
    "- Um clique que não seja o item seguinte conta como erro e o item continua disponível.",
    "- A tua pontuação é o tempo de conclusão; o melhor tempo por conjunto e comprimento fica neste navegador com a chave mg-sort-best.",
    "- Mudar o conjunto ou o comprimento começa logo uma ronda nova."
  ],
  sort: [
    "- Os números vão de 10 a 99, e cada número pertence a um único caixote.",
    "- Um ponto por cada separação certa e um ponto a menos por cada erro, nunca abaixo de zero.",
    "- A tua maior série de separações certas aparece destacada; a melhor pontuação fica neste navegador com a chave mg-bins-best.",
    "- A ronda termina quando o relógio chega a zero, e os caixotes ficam bloqueados até recomeçares.",
    "- Nada é descarregado e nenhuma ronda é enviada: a pontuação vive só no localStorage."
  ],
  math: [
    "- Fácil: somas e subtrações com números até 20.",
    "- Médio: multiplicações de 2 a 12, divisões exatas e somas ou subtrações pequenas até 30.",
    "- Difícil: multiplicações até 20, divisões exatas e somas ou subtrações com números até 100.",
    "- Um ponto por resposta certa, sem bónus por rapidez dentro da ronda: a pressão é o relógio.",
    "- A tua melhor pontuação em cada dificuldade fica neste navegador com a chave mg-math-best.",
    "- Quando o relógio chega a zero a ronda termina e a entrada fica bloqueada até recomeçares."
  ],
  slide: [
    "- Só se move a peça que partilha um lado com o espaço vazio; as vizinhas na diagonal não podem.",
    "- Cada baralhamento nasce de algumas centenas de jogadas legais a partir do tabuleiro resolvido, por isso existe sempre solução.",
    "- A tua pontuação é o número de jogadas, com o tempo como desempate para os teus registos.",
    "- O melhor número de jogadas por tamanho de tabuleiro fica neste navegador com a chave mg-slide-best.",
    "- Baralhar começa um tabuleiro novo, repõe os contadores e mantém a melhor pontuação."
  ],
  pattern: [
    "- Cinco sequências por dia, uma tentativa cada, sempre com respostas inteiras.",
    "- As respostas só podem ser negativas no conjunto de subtrações, e mesmo aí a sequência mantém-se acima de zero.",
    "- O teu melhor dia é o maior número de acertos em cinco, guardado com a chave mg-pattern-best.",
    "- A sequência diária fica com a chave mg-pattern-streak e conta os dias consecutivos em que concluíste o conjunto.",
    "- Reiniciar volta a jogar os cinco desafios de hoje; não gera outros novos."
  ],
  codebreak: [
    "- Fácil: três dígitos de 1 a 5, sem repetições, oito tentativas.",
    "- Médio: quatro dígitos de 1 a 6, repetições permitidas, dez tentativas.",
    "- Difícil: cinco dígitos de 1 a 8, repetições permitidas, doze tentativas.",
    "- Ganhas se acertares no código exato; a pontuação é o número de tentativas usadas, e a melhor pontuação por dificuldade fica no teu navegador.",
    "- Ficar sem tentativas revela o código, a ronda conta como derrota e a melhor pontuação não é mexida."
  ]
};
