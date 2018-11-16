/**
 * Sets the given height in the given Area.
 */
class ElevationPainter implements IPainter {
    elevation: number;
    constructor(elevation: number) {
        this.elevation = elevation;
    }

    paint(area: Area): void {
        for (let point of area.getPoints())
            for (let vertex of g_TileVertices) {
                let position = Vector2D.add(point, vertex);
                if (g_Map.validHeight(position))
                    g_Map.setHeight(position, this.elevation);
            }
    }
}