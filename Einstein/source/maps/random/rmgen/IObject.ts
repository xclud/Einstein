/**
 * An Object tries to find locations around a location and returns an array of Entity items holding the template names, owners and locations on success.
 */

interface IObject {
    avoidDistanceSquared: number;
    place(centerPosition: Vector2D, player: number, avoidPositions: Vector2D[], constraint: IConstraint, maxRetries: number): EntitySpecs[];
}