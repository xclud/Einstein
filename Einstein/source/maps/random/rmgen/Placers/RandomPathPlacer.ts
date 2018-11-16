/**
 * Creates a winded path between the given two vectors.
 * Uses a random angle at each step, so it can be more random than the sin form of the PathPlacer.
 * Omits the given offset after the start and before the end.
 */
class RandomPathPlacer {
    pathStart: Vector2D;
    pathEnd: Vector2D;
    pathWidth: number;
    offset: number;
    blended: boolean;
    offsetSquared: number;
    diskPlacer: DiskPlacer;
    maxPathLength: number;

    constructor(pathStart: Vector2D, pathEnd: Vector2D, pathWidth: number, offset: number, blended: boolean) {
        this.pathStart = Vector2D.add(pathStart, Vector2D.sub(pathEnd, pathStart).normalize().mult(offset)).round();
        this.pathEnd = pathEnd;
        this.offsetSquared = (offset * offset);
        this.blended = blended;
        this.diskPlacer = new DiskPlacer(pathWidth);
        this.maxPathLength = fractionToTiles(2);
    }

    place(constraint: IConstraint): Vector2D[] {
        let pathLength = 0;
        let points: Vector2D[] = [];
        let position = this.pathStart;

        while (position.distanceToSquared(this.pathEnd) >= this.offsetSquared && pathLength++ < this.maxPathLength) {
            position.add(
                new Vector2D(1, 0).rotate(
                    -getAngle(this.pathStart.x, this.pathStart.y, this.pathEnd.x, this.pathEnd.y) +
                    -Math.PI / 2 * (randFloat(-1, 1) + (this.blended ? 0.5 : 0)))).round();

            this.diskPlacer.setCenterPosition(position);

            for (let point of this.diskPlacer.place(constraint))
                if (points.every(p => !Vector2D.isEqualTo(p, point)))
                    points.push(point);
        }

        return points;
    }
}