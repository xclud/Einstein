/**
 * This class provides a cache to all resource names and properties defined by the JSON files.
 */
class Resources {
    resourceData: any[];
    resourceDataObj: any;
    resourceCodes: any[];
    resourceNames: any;

    constructor() {
        this.resourceData = [];
        this.resourceDataObj = {};
        this.resourceCodes = [];
        this.resourceNames = {};

        for (let filename of Engine.ListDirectoryFiles("simulation/data/resources/", "*.json", false)) {
            let data = Engine.ReadJSONFile(filename);
            if (!data)
                continue;

            if (data.code != data.code.toLowerCase())
                warn("Resource codes should use lower case: " + data.code);

            // Treasures are supported for every specified resource
            if (data.code == "treasure") {
                error("Encountered resource with reserved keyword: " + data.code);
                continue;
            }

            this.resourceData.push(data);
            this.resourceDataObj[data.code] = data;
            this.resourceCodes.push(data.code);
            this.resourceNames[data.code] = data.name;
            for (let subres in data.subtypes)
                this.resourceNames[subres] = data.subtypes[subres];
        }

        // Sort arrays by specified order
        let resSort = (a, b) =>
            a.order < b.order ? -1 :
                a.order > b.order ? +1 : 0;

        this.resourceData.sort(resSort);
        this.resourceCodes.sort((a, b) => resSort(
            this.resourceData.find(resource => resource.code == a),
            this.resourceData.find(resource => resource.code == b)
        ));

        deepfreeze(this.resourceData);
        deepfreeze(this.resourceDataObj);
        deepfreeze(this.resourceCodes);
        deepfreeze(this.resourceNames);
    }

    /**
     * Returns the objects defined in the JSON files for all availbale resources,
     * ordered as defined in these files.
     */
    GetResources() {
        return this.resourceData;
    }

    /**
     * Returns the object defined in the JSON file for the given resource.
     */
    GetResource(type) {
        return this.resourceDataObj[type];
    }

    /**
     * Returns an array containing all resource codes ordered as defined in the resource files.
     * For example ["food", "wood", "stone", "metal"].
     */
    GetCodes() {
        return this.resourceCodes;
    }

    /**
     * Returns an object mapping resource codes to translatable resource names. Includes subtypes.
     * For example { "food": "Food", "fish": "Fish", "fruit": "Fruit", "metal": "Metal", ... }
     */
    GetNames() {
        return this.resourceNames;
    }

    /**
 * Builds a RelaxRNG schema based on currently valid elements.
 *
 * To prevent validation errors, disabled resources are included in the schema.
 *
 * @param datatype - The datatype of the element
 * @param additional - Array of additional data elements. Time, xp, treasure, etc.
 * @param subtypes - If true, resource subtypes will be included as well.
 * @return RelaxNG schema string
 */
    BuildSchema(datatype: string, additional = [], subtypes = false) {
        if (!datatype)
            return "";

        switch (datatype) {
            case "decimal":
            case "nonNegativeDecimal":
            case "positiveDecimal":
                datatype = "<ref name='" + datatype + "'/>";
                break;

            default:
                datatype = "<data type='" + datatype + "'/>";
        }

        let resCodes = this.resourceData.map(resource => resource.code);
        let schema = "";
        for (let res of resCodes.concat(additional))
            schema +=
                "<optional>" +
                "<element name='" + res + "'>" +
                datatype +
                "</element>" +
                "</optional>";

        if (!subtypes)
            return "<interleave>" + schema + "</interleave>";

        for (let res of this.resourceData)
            for (let subtype in res.subtypes)
                schema +=
                    "<optional>" +
                    "<element name='" + res.code + "." + subtype + "'>" +
                    datatype +
                    "</element>" +
                    "</optional>";

        if (additional.indexOf("treasure") !== -1)
            for (let res of resCodes)
                schema +=
                    "<optional>" +
                    "<element name='" + "treasure." + res + "'>" +
                    datatype +
                    "</element>" +
                    "</optional>";

        return "<interleave>" + schema + "</interleave>";
    }

    /**
     * Builds the value choices for a RelaxNG `<choice></choice>` object, based on currently valid resources.
     *
     * @oaram subtypes - If set to true, the choices returned will be resource subtypes, rather than main types
     * @param treasure - If set to true, the pseudo resource 'treasure' (or its subtypes) will be included
     * @return String of RelaxNG Schema `<choice/>` values.
     */
    BuildChoicesSchema(subtypes = false, treasure = false) {
        let schema = "";

        if (!subtypes) {
            let resCodes = this.resourceData.map(resource => resource.code);
            if (treasure)
                resCodes.push("treasure");
            for (let res of resCodes)
                schema += "<value>" + res + "</value>";
        }
        else
            for (let res of this.resourceData) {
                for (let subtype in res.subtypes)
                    schema += "<value>" + res.code + "." + subtype + "</value>";
                if (treasure)
                    schema += "<value>" + "treasure." + res.code + "</value>";
            }

        return "<choice>" + schema + "</choice>";
    }
}