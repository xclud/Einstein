/**
 * A Constraint decides if a tile satisfies a condition defined by the class.
 */
interface IConstraint {
    allows(position: Vector2D): boolean;
}