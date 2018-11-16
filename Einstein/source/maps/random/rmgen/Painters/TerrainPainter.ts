/**
 * The TerrainPainter draws a given terrain texture over the given area.
 * When used with TERRAIN_SEPARATOR, an entity is placed on each tile.
 */
class TerrainPainter implements IPainter {
    terrain: ITerrain;

    constructor(terrain: string | string[]) {
        this.terrain = createTerrain(terrain);
    }

    paint(area: Area): void {
        for (let point of area.getPoints())
            this.terrain.place(point);
    }
}