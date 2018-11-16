/**
 * Returns all points on a disk at the given location that meet the constraint.
 */
class DiskPlacer implements ICenteredPlacer, IPlacer {
    radiusSquared: number;
    centerPosition: Vector2D;

    constructor(radius: number, centerPosition: Vector2D = undefined) {
        this.radiusSquared = radius * radius;
        this.centerPosition = undefined;

        if (centerPosition) {
            this.setCenterPosition(centerPosition);
        }
    }

    setCenterPosition(position: Vector2D): void {
        this.centerPosition = deepfreeze(position.clone().round());
    }

    place(constraint: IConstraint): Vector2D[] {
        var points = new Array<Vector2D>();

        for (var x = 0; x < g_Map.getSize(); ++x) {
            for (var y = 0; y < g_Map.getSize(); ++y) {
                var point = new Vector2D(x, y);

                if (this.centerPosition.distanceToSquared(point) <= this.radiusSquared && constraint.allows(point)) {
                    points.push(point);
                }
            }
        }

        return points;
    }
}