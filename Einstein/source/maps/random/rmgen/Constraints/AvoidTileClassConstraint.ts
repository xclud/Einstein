/**
 * The AvoidTileClassConstraint is met if there are no tiles marked with the given TileClass within the given radius of the tile.
 */
class AvoidTileClassConstraint implements IConstraint {
    tileClass: TileClass;
    distance: number;

    constructor(tileClass: TileClass, distance: number) {
        this.tileClass = tileClass;
        this.distance = distance;
    }

    allows(position) {
        return this.tileClass.countMembersInRadius(position, this.distance) == 0;
    }
}