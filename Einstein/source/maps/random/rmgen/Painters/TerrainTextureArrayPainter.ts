/**
 * Paints the given texture-mapping to the given tiles.
 *
 * @param {String[]} textureIDs - Names of the terrain textures
 * @param {Number[]} textureNames - One-dimensional array of indices of texturenames, one for each tile of the entire map.
 * @returns
 */
class TerrainTextureArrayPainter implements IPainter {
    textureIDs: string[];
    textureNames: number[];

    constructor(textureIDs: string[], textureNames: number[]) {
        this.textureIDs = textureIDs;
        this.textureNames = textureNames;
    }

    paint(area: Area): void {
        let sourceSize = Math.sqrt(this.textureIDs.length);
        let scale = sourceSize / g_Map.getSize();

        for (let point of area.getPoints()) {
            let sourcePos = Vector2D.mult(point, scale).floor();
            g_Map.setTexture(point, this.textureNames[this.textureIDs[sourcePos.x * sourceSize + sourcePos.y]]);
        }
    }
}
