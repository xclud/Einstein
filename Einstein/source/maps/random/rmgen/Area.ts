/*
 * An Area is a set of Vector2D points and a cache to lookup membership quickly.
*/
class Area {
    points: Vector2D[];
    cache: Array<Uint8Array>;
    constructor(points: Vector2D[]) {
        this.points = points;

        let mapSize = g_Map.getSize();
        this.cache = new Array(mapSize).fill(0).map(() => new Uint8Array(mapSize));

        for (let point of points) {
            this.cache[point.x][point.y] = 1;
        }
    }

    getPoints(): Vector2D[] {
        return this.points;
    }

    contains(point: Vector2D): boolean {
        return g_Map.inMapBounds(point) && this.cache[point.x][point.y] == 1;
    }

    getClosestPointTo(position: Vector2D): Vector2D | undefined {
        if (!this.points.length) {
            return undefined;
        }

        var closestPoint = this.points[0];
        var shortestDistance = Infinity;

        for (var point of this.points) {

            var currentDistance = point.distanceToSquared(position);

            if (currentDistance < shortestDistance) {
                shortestDistance = currentDistance;
                closestPoint = point;
            }
        }

        return closestPoint;
    }
}