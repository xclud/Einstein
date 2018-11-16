/**
 * The NullConstraint is always satisfied.
 */
class NullConstraint implements IConstraint {
    allows(position: Vector2D): boolean {
        return true;
    }
}