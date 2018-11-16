class GameMap {
    validHeight(vertex: Vector2D): boolean {
        throw new Error("Method not implemented.");
    }
    height: any = 0;
    setHeight(vertexPos: Vector2D, arg1: number): void {
        throw new Error("Method not implemented.");
    }
    placeEntityPassable(templateName: any, playerID: any, arg2: Vector2D, arg3: number): void {
        throw new Error("Method not implemented.");
    }
    getCenter(): Vector2D {
        throw new Error("Method not implemented.");
    }
    createTileClass(): TileClass {
        throw new Error("Method not implemented.");
    }
    getBounds(): BoundingBox {
        throw new Error("Method not implemented.");
    }
    getSize(): number {
        return 0;
    }

    inMapBounds(point: Vector2D): boolean {
        return false;
    }
    validTilePassable(point: Vector2D): boolean {
        return false;
    }
    getAdjacentPoints(position: Vector2D): Vector2D[] {
        return [];
    }

    getSlope(position: Vector2D): number {
        return 0;
    }
    getHeight(position: Vector2D): number {
        return 0;
    }

    getTexture(position: Vector2D): number {
        return 0;
    }

    placeEntityAnywhere(name, x, y, z) {

    }

    validTile(pos: Vector2D): boolean {
        throw new Error("Method not implemented.");
    }

    log(x: any): void {

    }

    randomCoordinate(x: boolean): Vector2D {
        throw new Error("Method not implemented.");
    }

    setTexture(p: Vector2D, t: any) {

    }

    setTerrainEntity(templateName: string, arg1: number, arg2: Vector2D, arg3: number): any {
        throw new Error("Method not implemented.");
    }
}