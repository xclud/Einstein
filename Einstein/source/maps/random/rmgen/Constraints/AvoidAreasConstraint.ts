/**
 * The AvoidAreasConstraint is met if none of the given Areas contain the point.
 */
class AvoidAreasConstraint implements IConstraint {
    areas: Area[];
    constructor(areas: Area[]) {
        this.areas = areas;
    }

    allows(position: Vector2D): boolean {
        return this.areas.every(area => !area.contains(position))
    }
}