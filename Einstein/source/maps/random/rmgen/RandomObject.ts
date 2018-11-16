/**
 * Same as SimpleObject, but choses one of the given templates at random.
 */
class RandomObject implements IObject {
    templateNames: string[];
    minCount: number;
    maxCount: number;
    maxDistance: number;
    minDistance: number;
    minAngle: number;
    maxAngle: number;
    avoidDistance: number;
    avoidDistanceSquared: number;

    constructor(templateNames: string[], minCount: number, maxCount: number, minDistance: number, maxDistance: number, minAngle: number, maxAngle: number, avoidDistance: number = 1) {
        this.templateNames = templateNames;
        this.minCount = minCount;
        this.maxCount = maxCount;
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
        this.minAngle = minAngle;
        this.maxAngle = maxAngle;
        this.avoidDistance = avoidDistance;
        this.avoidDistanceSquared = avoidDistance * avoidDistance;
    }

    place(centerPosition: Vector2D, player: number, avoidPositions: Vector2D[], constraint: IConstraint, maxRetries: number) {
        return new SimpleObject(pickRandom(this.templateNames), this.minCount, this.maxCount, this.minDistance, this.maxDistance, this.minAngle, this.maxAngle, this.avoidDistance).place(
            centerPosition, player, avoidPositions, constraint, maxRetries);
    }
}
