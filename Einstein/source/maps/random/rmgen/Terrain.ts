/**
 * SimpleTerrain paints the given texture on the terrain.
 *
 * Optionally it places an entity on the affected tiles and
 * replaces prior entities added by SimpleTerrain on the same tile.
 */
class SimpleTerrain implements ITerrain {
    texture: any;
    templateName: string;
    constructor(texture: any, templateName: string = undefined) {
        if (texture === undefined)
            throw new Error("SimpleTerrain: texture not defined");

        this.texture = texture;
        this.templateName = templateName;
    }

    place(position: Vector2D) {
        if (this.templateName && g_Map.validTilePassable(position)) {
            g_Map.setTerrainEntity(this.templateName, 0, Vector2D.add(position, new Vector2D(0.5, 0.5)), randomAngle());
        }
        g_Map.setTexture(position, this.texture);
    }
}

/**
 * RandomTerrain places one of the given Terrains on the tile.
 * It choses a random Terrain each tile.
 * This is commonly used to create heterogeneous forests.
 */

class RandomTerrain implements ITerrain {
    terrains: ITerrain[];
    constructor(terrains: ITerrain[]) {
        if (!(terrains instanceof Array) || !terrains.length)
            throw new Error("RandomTerrain: Invalid terrains array");

        this.terrains = terrains;
    }

    place(position: Vector2D) {
        pickRandom(this.terrains).place(position);
    }
}