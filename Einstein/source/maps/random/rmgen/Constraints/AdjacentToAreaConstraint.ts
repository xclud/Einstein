/**
 * The AdjacentToAreaConstraint is met if the point is adjacent to one of the given Areas and not contained by that Area.
  */
class AdjacentToAreaConstraint implements IConstraint {
    areas: Area[];
    constructor(areas: Area[]) {
        this.areas = areas;
    }

    allows(position: Vector2D): boolean {
        return this.areas.some(area =>
            !area.contains(position) &&
            g_Map.getAdjacentPoints(position).some(adjacentPosition => area.contains(adjacentPosition)));
    }
}