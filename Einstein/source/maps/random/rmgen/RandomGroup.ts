/**
 * Randomly choses one of the given Objects and places it just like the SimpleGroup.
 */
class RandomGroup implements IGroup {
    simpleGroup: SimpleGroup;

    constructor(objects: IObject[], avoidSelf: boolean = false, tileClass: TileClass = undefined, centerPosition: Vector2D = undefined) {
        this.simpleGroup = new SimpleGroup([pickRandom(objects)], avoidSelf, tileClass, centerPosition);
    }

    setCenterPosition(position: Vector2D): void {
        this.simpleGroup.setCenterPosition(position);
    }

    place(playerID: number, constraint: IConstraint) {
        return this.simpleGroup.place(playerID, constraint);
    }
}