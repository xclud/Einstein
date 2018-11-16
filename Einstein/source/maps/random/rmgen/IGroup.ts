/**
 * A Group tests if a set of entities specified in the constructor can be placed and
 * potentially places some of them (typically all or none).
 *
 * The location is defined by the x and z property of the Group instance and can be modified externally.
 * The Group is free to determine whether, where exactly and how many entities to place.
 *
 * The Constraint to test against and the future owner of the entities are passed by the caller.
 * Typically Groups are called from createObjectGroup with the location set in the constructor or
 * from createObjectGroups that randomizes the x and z property of the Group before calling place.
 */

interface IGroup {
    setCenterPosition(position: Vector2D): void;
    place(playerID: number, constraint: IConstraint);
}