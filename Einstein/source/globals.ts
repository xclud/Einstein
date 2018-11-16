var TechnologyTemplates: ModificationTemplates;
var AuraTemplates: ModificationTemplates;
const _Resources = new Resources();

function LoadModificationTemplates() {
    AuraTemplates = new ModificationTemplates("simulation/data/auras/");
    TechnologyTemplates = new ModificationTemplates("simulation/data/technologies/");
}