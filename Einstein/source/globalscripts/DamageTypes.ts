class DamageTypes {
    names: any;
    constructor() {
        // TODO: load these from files

        this.names = {
            "Hack": markForTranslationWithContext("damage type", "Hack"),
            "Pierce": markForTranslationWithContext("damage type", "Pierce"),
            "Crush": markForTranslationWithContext("damage type", "Crush"),
        };

        deepfreeze(this.names);
    }

    GetNames() {
        return this.names;
    }

    GetTypes() {
        return Object.keys(this.names);
    }
}