/**
 * The AvoidTextureConstraint is met if the terrain texture of the tile is different from the given texture.
 */
class AvoidTextureConstraint implements IConstraint {
    texture: any;
    constructor(texture) {
        this.texture = texture;
    }

    allows(position) {
        return g_Map.getTexture(position) != this.texture;
    }
}