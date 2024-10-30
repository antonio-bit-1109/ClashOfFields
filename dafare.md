# To-do-List

-   [x] Controllare che possa essere fatto il deploy del missile solo se c'è carica della batteria sufficiente.
        Se la carica è sufficiente sottrarre il costo dell'arma dalla batteria

-   [x] Aggiungere audio del missile che cade

-   [x] Risolvere il problema della carica batteria che impazzisce: da 3 di carica, dopo un missile finisce a -3 o a un valore comunque sbagliato

-   [x] Aggiungere audio di sottofondo

-   [x] Implementare durata partita di 45 secondi e determinare il vincitore (querySelector?)

-   [x] inserimento logo

-   [x] Gestire pausa partita: QUANDO METTO IN PAUSA NON POSSO POTER CLICCARE LE CELLE. RIMUOVI EV. LIST DALLA CELLE. clear interval di tutti i timer e rimuovere event listener dalle celle ??

-   [x] se non hai abbastanza carica della batteria per usare quell arma, messaggio rosso animato , sotto al messaggio di servizio per avvertire che la carica non è sufficiente

-   [x] non riesco ad utilizzare il logo scaricato , nella cartelle fonts

-   [x] sistemare le celle in modo da evitare effetto pacMan sulle celle al lato opposto e ridare colore rosso sempre alle celle opposte.

-   [x] quando metto in pausa devo trovare un modo di gestire interruzione e ripresa della propagazion del laser

-   [x] riporta costo missile a 3

-   [x] implementa un meccanismo che fa capire all utente che l immagine sta fetchando e quindi deve aspettare (AWAITING)

-   [x] completa funzione per modificare il timer di gioco

-   [xxxxxxx] SISTEMA SELECT CELL E CONSUMA CARICA BATTERIA

-   [xxxxx] sistema meccanismo di sottrazione della carica della batteria, su numeri pari non funziona -- SFANCULA CON I MULTIPLI (se costo 2 e carica 4 te la leva tutta) (costo 3 carica 6 te la leva tutta)

-   [x] linear propagation è rotta, fix

-   [x] implementa tutte le armi.

-   [x] Implementare un meccanismo di randomicità nelle mosse del computer (web socket ? -- server ?? )

-   [x] eliminare effetto PacMan anche sulle celle che sono distaccate n +2 o n-2 dal bordo

-   [x] modifica funzione deploy laser del computer in modo che faccia deploy dalle sue caselle rosse, verso le celle blue
-   [x] fix del div/p che vibra che fa apparire lo scroll orizzontale

-   [] quanod faccio deploy missile, voglio che venga eliminata un eventuale classe corpoarma che ne cambia il colore

-   [] implementa meccanismo di difficoltà del pc, in base alla difficoltà selezionata pc parte gia con carica iniziale e fa attacchi piu ravvicinati nel tempo ??

-   [] implementa una funzione per ripulire tutte le celle dalla classe flip cell dell animaizone, dopo ogni attacco ( fatto solo missile utente, pc )

-   [] implementa color thief e controlla se l'immagine di sfondo caricata è scura, se sì, allora metti i testi del div message scuri.

-   [] sistema caso in cui sto cliccando sempre sulle celle vicino ai bordi ma anche dall altra parte del bordo le celle sono del mio colore, si rompe, riporta le celle rosse.
