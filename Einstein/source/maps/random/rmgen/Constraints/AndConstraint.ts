/**
 * The AndConstraint is met if every given Constraint is satisfied by the tile.
 */
class AndConstraint implements IConstraint {
    constraints: IConstraint[];

    constructor(constraints: IConstraint[]) {
        this.constraints = constraints;
    }

    allows(position: Vector2D): boolean {
        return this.constraints.every(constraint => constraint.allows(position));
    }
}