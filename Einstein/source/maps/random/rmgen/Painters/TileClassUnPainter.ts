/**
 * Removes the given tileclass from a given area.
 */
class TileClassUnPainter implements IPainter {
    tileClass: TileClass;

    constructor(tileClass: TileClass) {
        this.tileClass = tileClass;
    }

    paint(area: Area): void {
        for (let point of area.getPoints()) {
            this.tileClass.remove(point);
        }
    }
}