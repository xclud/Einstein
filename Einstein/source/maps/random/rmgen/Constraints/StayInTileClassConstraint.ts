/**
 * The StayInTileClassConstraint is met if every tile within the given radius of the tile is marked with the given TileClass.
 */
class StayInTileClassConstraint implements IConstraint {
    tileClass: TileClass;
    distance: number;

    constructor(tileClass: TileClass, distance: number) {
        this.tileClass = tileClass;
        this.distance = distance;
    }

    allows(position: Vector2D): boolean {
        return this.tileClass.countNonMembersInRadius(position, this.distance) == 0;
    }
}