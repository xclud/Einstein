/**
 * Places all of the given Objects.
 *
 * @param objects - An array of Objects, for instance SimpleObjects.
 * @param avoidSelf - Objects will not overlap.
 * @param tileClass - Optional TileClass that tiles with placed entities are marked with.
 * @param centerPosition - The location the group is placed around. Can be omitted if the property is set externally.
*/
class SimpleGroup implements IGroup {
    objects: IObject[];
    avoidSelf: boolean;
    tileClass: TileClass;
    centerPosition: Vector2D;

    constructor(objects: IObject[], avoidSelf: boolean = false, tileClass: TileClass = undefined, centerPosition: Vector2D = undefined) {
        this.objects = objects;
        this.tileClass = tileClass;
        this.avoidSelf = avoidSelf;
        this.centerPosition = undefined;

        if (centerPosition) {
            this.setCenterPosition(centerPosition);
        }
    }

    setCenterPosition(position: Vector2D): void {
        this.centerPosition = deepfreeze(position.clone().round());
    }

    place(playerID: number, constraint: IConstraint) {
        let entitySpecsResult = new Array<EntitySpecs>();
        let avoidPositions = this.avoidSelf ? [] : undefined;

        // Test if the Objects can be placed at the given location
        // Place none of them if one can't be placed.
        for (let object of this.objects) {
            var entitySpecs = object.place(this.centerPosition, playerID, avoidPositions, constraint, 30);

            if (!entitySpecs)
                return undefined;

            entitySpecsResult = entitySpecsResult.concat(entitySpecs);

            if (this.avoidSelf)
                avoidPositions = avoidPositions.concat(entitySpecs.map(entitySpec => ({
                    "position": entitySpec.position,
                    "distanceSquared": object.avoidDistanceSquared
                })));
        }

        // Create and place entities as specified
        let entities = [];
        for (let entitySpecs of entitySpecsResult) {
            // The Object must ensure that non-actor entities are not placed at the impassable map-border
            entities.push(
                g_Map.placeEntityAnywhere(entitySpecs.templateName, entitySpecs.playerID, entitySpecs.position, entitySpecs.angle));

            if (this.tileClass) {
                this.tileClass.add(entitySpecs.position.clone().floor());
            }
        }

        return entities;
    }
}