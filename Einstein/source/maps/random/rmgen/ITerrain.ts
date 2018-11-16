/**
 * A Terrain is a class that modifies an arbitrary property of a given tile.
 */
interface ITerrain {
    place(position: Vector2D): void;
}