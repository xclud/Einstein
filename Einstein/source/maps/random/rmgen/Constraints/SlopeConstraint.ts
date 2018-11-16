/**
 * The SlopeConstraint is met if the steepness of the terrain is within the given range.
 */
class SlopeConstraint implements IConstraint {
    minSlope: number;
    maxSlope: number;

    constructor(minSlope: number, maxSlope: number) {
        this.minSlope = minSlope;
        this.maxSlope = maxSlope;
    }

    allows(position: Vector2D): boolean {
        return this.minSlope <= g_Map.getSlope(position) && g_Map.getSlope(position) <= this.maxSlope;
    }
}