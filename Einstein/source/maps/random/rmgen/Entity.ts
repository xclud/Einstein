/**
 * @file The Entity class stores the given template name, owner and location of an entity and assigns an entityID.
 * Instances of this class (with the position using the tile coordinate system) are
 * converted by ScriptConversions.cpp to the Entity struct defined in source/graphics/Entity.h and passed to MapReader.cpp.
 */
// TODO: support full position and rotation

class Entity {
    id: any;
    templateName: string;
    player: number;
    position: Vector3D;
    rotation: Vector3D;

    constructor(entityID: any, templateName: string, playerID: number, position: Vector2D, orientation: number) {
        this.player = playerID;
        this.templateName = templateName;
        this.id = entityID;
        this.position = new Vector3D(position.x, 0, position.y);
        this.rotation = new Vector3D(0, orientation, 0);
    }


    GetPosition2D() {
        return Vector2D.from3D(this.position);
    }
}
