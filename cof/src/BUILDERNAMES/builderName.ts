class builderName {
    private lunghezzaParola = 0;
    private vocali: string[] = ["a", "e", "i", "o", "u"];
    private consonanti: string[] = ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"];
    private TheWord: string = "";

    constructor() {}

    public startPipeline() {
        this.scegliLunghezzaParola();
        this.generaParola();
        return this.TheWord;
    }

    private scegliLunghezzaParola(): void {
        this.reset();
        const lenghtParola = Math.floor(Math.random() * 10);
        this.lunghezzaParola = lenghtParola;
    }

    private generaParola() {
        let takeFromVocali = true;
        for (let i = 0; i < this.lunghezzaParola; i++) {
            if (takeFromVocali) {
                let random = Math.floor(Math.random() * this.vocali.length);
                this.TheWord += this.vocali[random];
                takeFromVocali = false;
            } else {
                let random = Math.floor(Math.random() * this.consonanti.length);
                this.TheWord += this.consonanti[random];
                takeFromVocali = true;
            }
        }
    }

    private reset(): void {
        this.lunghezzaParola = 0;
        this.TheWord = "";
    }
}

export { builderName };
