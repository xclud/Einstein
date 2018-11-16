/**
 * The RectPlacer returns all tiles between the two given points that meet the Constraint.
 */
class RectPlacer implements IPlacer {
    bounds: BoundingBox;
    failFraction: number;

    constructor(start: Vector2D, end: Vector2D, failFraction: number = Infinity) {
        this.bounds = getBoundingBox([start, end]);
        this.bounds.min.floor();
        this.bounds.max.floor();
        this.failFraction = failFraction;
    }

    place(constraint: IConstraint) {
        let bboxPoints = getPointsInBoundingBox(this.bounds);
        let points = bboxPoints.filter(point => g_Map.inMapBounds(point) && constraint.allows(point));
        return (bboxPoints.length - points.length) / bboxPoints.length <= this.failFraction ? points : undefined;
    }
}