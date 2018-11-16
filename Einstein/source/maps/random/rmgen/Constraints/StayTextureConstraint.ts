/**
 * The StayTextureConstraint is met if the tile has the given texture.
 */
class StayTextureConstraint implements IConstraint {
    texture: any;
    constructor(texture) {
        this.texture = texture;
    }

    allows(position) {
        return g_Map.getTexture(position) == this.texture;
    }
}