# To-do-List

-   [x] Controllare che possa essere fatto il deploy del missile solo se c'è carica della batteria sufficiente.
        Se la carica è sufficiente sottrarre il costo dell'arma dalla batteria

-   [x] Aggiungere audio del missile che cade

-   [x] Risolvere il problema della carica batteria che impazzisce: da 3 di carica, dopo un missile finisce a -3 o a un valore comunque sbagliato

-   [ ] Implementare un meccanismo di randomicità nelle mosse del computer

-   [x] Aggiungere audio di sottofondo

-   [x] Implementare durata partita di 45 secondi e determinare il vincitore (querySelector?)

-   [x] inserimento logo

-   [ ] Gestire pausa partita: QUANDO METTO IN PAUSA NON POSSO POTER CLICCARE LE CELLE. RIMUOVI EV. LIST DALLA CELLE. clear interval di tutti i timer e rimuovere event listener dalle celle ??

-   [ ] implementa tutte le armi.

-   [x] se non hai abbastanza carica della batteria per usare quell arma, messaggio rosso animato , sotto al messaggio di servizio per avvertire che la carica non è sufficiente

<!-- @font-face {
    font-family: "PixelSans";
    src: url("../fonts/PixeloidSans-mLxMm.ttf") format("truetype");
} in CSS  -->

-   [x] non riesco ad utilizzare il logo scaricato , nella cartelle fonts

-   [x] sistemare le celle in modo da evitare effetto pacMan sulle celle al lato opposto e ridare colore rosso sempre alle celle opposte.

-   [] eliminare effetto PacMan anche sulle celle che sono distaccate n +2 o n-2 dal bordo

-   [] riporta costo missile a 3

-   [] sistema caso in cui sto cliccando sempre sulle celle vicino ai bordi ma anche dall altra parte del bordo le celle sono del mio colore, si rompe, riporta le celle rosse.

-   [] sistema meccanismo di sottrazione della carica della batteria, su numeri pari non funziona -- SFANCULA CON I MULTIPLI (se costo 2 e carica 4 te la leva tutta) (costo 3 carica 6 te la leva tutta)

-   [] quando metto in pausa devo trovare un modo di gestire interruzione e ripresa della propagazion del laser
