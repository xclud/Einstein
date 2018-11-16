/**
 * Constrains the area to any tile on the map that is passable.
 */
class PassableMapAreaConstraint implements IConstraint {

    allows(position: Vector2D) {
        return g_Map.validTilePassable(position);
    }
}