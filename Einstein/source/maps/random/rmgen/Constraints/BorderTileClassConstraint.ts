/**
 * The BorderTileClassConstraint is met if there are
 * tiles not marked with the given TileClass within distanceInside of the tile and
 * tiles marked with the given TileClass within distanceOutside of the tile.
 */
class BorderTileClassConstraint implements IConstraint {
    tileClass: TileClass;
    distanceInside: number;
    distanceOutside: number;

    constructor(tileClass: TileClass, distanceInside: number, distanceOutside: number) {
        this.tileClass = tileClass;
        this.distanceInside = distanceInside;
        this.distanceOutside = distanceOutside;
    }

    allows(position: Vector2D): boolean {
        return this.tileClass.countMembersInRadius(position, this.distanceOutside) > 0 &&
            this.tileClass.countNonMembersInRadius(position, this.distanceInside) > 0;
    }
}