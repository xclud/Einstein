class RandomMapLogger {

    prefix: string;
    startTime: number;
    lastTime: number;

    constructor() {
        this.lastTime = undefined;
        this.startTime = Date.now();
        this.prefix = ""; // seems noisy

        this.printDirectly(
            this.prefix +
            "Generating " + g_MapSettings.Name +
            " of size " + g_MapSettings.Size +
            " and " + getNumPlayers() + " players.\n");
    }

    log(string: string) {
        //TODO:
    }

    printDirectly(string: string) {
        this.log(string);
        this.print(string);
    }

    print(string: string) {
        this.printDuration();
        this.printDirectly(this.prefix + string + "...");
        this.lastTime = Date.now();
    }

    printDuration() {
        if (!this.lastTime)
            return;

        this.printDurationDirectly("", this.lastTime);
        this.lastTime = Date.now();
    }

    close() {
        this.printDuration();
        this.printDurationDirectly(this.prefix + "Total map generation time:", this.startTime);
    }

    printDurationDirectly(text: string, startTime: number) {
        this.printDirectly(text + " " + ((Date.now() - startTime) / 1000).toFixed(3) + "s.\n");
    }
}