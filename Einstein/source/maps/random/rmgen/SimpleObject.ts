/**
 * The SimpleObject attempts to find locations for a random amount of entities with a random distance to the given center.
 */
class SimpleObject implements IObject {
    templateName: string;
    minCount: number;
    maxCount: number;
    maxDistance: number;
    minDistance: number;
    minAngle: number;
    maxAngle: number;
    avoidDistance: number;
    avoidDistanceSquared: number;

    constructor(templateName: string, minCount: number, maxCount: number, minDistance: number, maxDistance: number, minAngle: number = 0, maxAngle: number = 2 * Math.PI, avoidDistance: number = 1) {
        this.templateName = templateName;
        this.minCount = minCount;
        this.maxCount = maxCount;
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
        this.minAngle = minAngle;
        this.maxAngle = maxAngle;
        this.avoidDistance = avoidDistance;
        this.avoidDistanceSquared = avoidDistance * avoidDistance;

        if (minCount > maxCount)
            throw new Error("SimpleObject: minCount should be less than or equal to maxCount");

        if (minDistance > maxDistance)
            throw new Error("SimpleObject: minDistance should be less than or equal to maxDistance");

        if (minAngle > maxAngle)
            throw new Error("SimpleObject: minAngle should be less than or equal to maxAngle");
    }

    place(centerPosition: Vector2D, playerID: number, avoidPositions: any[], constraint: IConstraint, maxRetries: number) {
        let entitySpecs = new Array<EntitySpecs>();
        let numRetries = 0;
        let validTile = pos => this.templateName.startsWith(g_ActorPrefix) ? g_Map.validTile(pos) : g_Map.validTilePassable(pos);

        for (let i = 0; i < randIntInclusive(this.minCount, this.maxCount); ++i)
            while (true) {
                var distance = randFloat(this.minDistance, this.maxDistance);
                var angle = randomAngle();

                var position = Vector2D.sum([centerPosition, new Vector2D(0.5, 0.5), new Vector2D(distance, 0).rotate(-angle)]);

                if (validTile(position) &&
                    (!avoidPositions ||
                        entitySpecs.every(entSpec => entSpec.position.distanceToSquared(position) >= this.avoidDistanceSquared) &&
                        avoidPositions.every(avoid => avoid.position.distanceToSquared(position) >= Math.max(this.avoidDistanceSquared, avoid.distanceSquared))) &&
                    constraint.allows(position.clone().floor())) {
                    entitySpecs.push({
                        "templateName": this.templateName,
                        "playerID": playerID,
                        "position": position,
                        "angle": randFloat(this.minAngle, this.maxAngle)
                    });
                    break;
                }

                if (numRetries++ > maxRetries)
                    return undefined;
            }

        return entitySpecs;
    }
}