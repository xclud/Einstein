/**
 * The StaticConstraint is used for performance improvements of existing Constraints.
 * It is evaluated for the entire map when the Constraint is created.
 * So when a createAreas or createObjectGroups call uses this, it can rely on the cache,
 * rather than reevaluating it for every randomized coordinate.
 * Account for the fact that the cache is never updated!
 */
class StaticConstraint implements IConstraint {
    constraint: AndConstraint;
    cache: Uint8Array[];

    constructor(constraints: IConstraint[]) {
        let mapSize = g_Map.getSize();

        this.constraint = new AndConstraint(constraints);
        this.cache = new Array(mapSize).fill(0).map(() => new Uint8Array(mapSize));
    }

    allows(position: Vector2D): boolean {
        if (!this.cache[position.x][position.y])
            this.cache[position.x][position.y] = this.constraint.allows(position) ? 2 : 1;

        return this.cache[position.x][position.y] == 2;
    }
}