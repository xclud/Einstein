/**
 * The HeightConstraint is met if the elevation of the tile is within the given range.
 * One can pass Infinity to only test for one side.
 */
class HeightConstraint implements IConstraint {
    minHeight: number;
    maxHeight: number;

    constructor(minHeight: number, maxHeight: number) {
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
    }

    allows(position: Vector2D): boolean {
        return this.minHeight <= g_Map.getHeight(position) && g_Map.getHeight(position) <= this.maxHeight;
    }
}