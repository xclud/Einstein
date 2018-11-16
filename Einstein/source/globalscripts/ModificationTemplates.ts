/**
 * @file This provides a cache for Aura and Technology templates.
 * They may not be serialized, otherwise rejoined clients would refer
 * to different objects, triggering an Out-of-sync error.
 */
class ModificationTemplates {
    names: string[];
    templates: any;

    constructor(path) {
        let suffix = ".json";

        this.names = deepfreeze(listFiles(path, suffix, true));

        this.templates = {};

        for (let name of this.names)
            this.templates[name] = Engine.ReadJSONFile(path + name + suffix);

        deepfreeze(this.templates);
    }

    GetNames() {
        return this.names;
    }

    Has(name) {
        return this.names.indexOf(name) != -1;
    }

    Get(name) {
        return this.templates[name];
    };
    GetAll() {
        return this.templates;
    }
}