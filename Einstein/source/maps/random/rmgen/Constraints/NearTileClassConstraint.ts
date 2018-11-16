/**
 * The NearTileClassConstraint is met if at least one tile within the given radius of the tile is marked with the given TileClass.
 */
class NearTileClassConstraint implements IConstraint {
    tileClass: TileClass;
    distance: number;
    constructor(tileClass: TileClass, distance: number) {
        this.tileClass = tileClass;
        this.distance = distance;
    }

    allows(position) {
        return this.tileClass.countMembersInRadius(position, this.distance) > 0;
    }
}