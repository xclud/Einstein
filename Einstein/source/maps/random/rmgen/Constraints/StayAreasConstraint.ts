/**
 * The StayAreasConstraint is met if some of the given Areas contains the point.
  */
class StayAreasConstraint implements IConstraint {
    areas: Area[];
    constructor(areas: Area[]) {
        this.areas = areas;
    }

    allows(position: Vector2D): boolean {
        return this.areas.some(area => area.contains(position));
    }
}