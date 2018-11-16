/**
 * Copies the given heightmap to the given area.
 * Scales the horizontal plane proportionally and applies bicubic interpolation.
 * The heightrange is either scaled proportionally or mapped to the given heightrange.
 */
class HeightmapPainter implements IPainter {
    heightmap: Uint16Array;
    normalMinHeight: number;
    normalMaxHeight: number;
    verticesPerSide: number;
    bicubicInterpolation: (x: Vector2D, ...y: Vector2D[]) => number;

    /**
     * @param {Uint16Array} heightmap - One dimensional array of vertex heights.
     * @param {Number} [normalMinHeight] - The minimum height the elevation grid of 320 tiles would have.
     * @param {Number} [normalMaxHeight] - The maximum height the elevation grid of 320 tiles would have.
     */
    constructor(heightmap: Uint16Array, normalMinHeight: number = undefined, normalMaxHeight: number = undefined) {
        this.heightmap = heightmap;
        this.bicubicInterpolation = bicubicInterpolation;
        this.verticesPerSide = heightmap.length;
        this.normalMinHeight = normalMinHeight;
        this.normalMaxHeight = normalMaxHeight;
    }

    getScale(): number {
        return this.verticesPerSide / (g_Map.getSize() + 1);
    }

    scaleHeight(height: number): number {
        if (this.normalMinHeight === undefined || this.normalMaxHeight === undefined)
            return height / this.getScale() / HEIGHT_UNITS_PER_METRE;

        let minHeight = this.normalMinHeight * (g_Map.getSize() + 1) / 321;
        let maxHeight = this.normalMaxHeight * (g_Map.getSize() + 1) / 321;

        return minHeight + (maxHeight - minHeight) * height / 0xFFFF;
    }

    paint(area: Area): void {
        let scale = this.getScale();
        let leftBottom = new Vector2D(0, 0);
        let rightTop = new Vector2D(this.verticesPerSide, this.verticesPerSide);
        let brushSize = new Vector2D(3, 3);
        let brushCenter = new Vector2D(1, 1);

        // Additional complexity to process all 4 vertices of each tile, i.e the last row too
        let seen = new Array(g_Map.height.length).fill(0).map(zero => new Uint8Array(g_Map.height.length).fill(0));

        for (let point of area.getPoints())
            for (let vertex of g_TileVertices) {
                let vertexPos = Vector2D.add(point, vertex);

                if (!g_Map.validHeight(vertexPos) || seen[vertexPos.x][vertexPos.y])
                    continue;

                seen[vertexPos.x][vertexPos.y] = 1;

                let sourcePos = Vector2D.mult(vertexPos, scale);
                let sourceTilePos = sourcePos.clone().floor();

                let brushPosition = Vector2D.max(
                    leftBottom,
                    Vector2D.min(
                        Vector2D.sub(sourceTilePos, brushCenter),
                        Vector2D.sub(rightTop, brushSize).sub(brushCenter)));

                let bounds = getBoundingBox([brushPosition, Vector2D.add(brushPosition, brushSize)]);
                let points = getPointsInBoundingBox(bounds);
                let scaled = points.map(pos => this.scaleHeight(this.heightmap[pos.x][pos.y]));

                g_Map.setHeight(vertexPos, bicubicInterpolation(Vector2D.sub(sourcePos, brushPosition).sub(brushCenter), ...scaled));
            }
    }
}