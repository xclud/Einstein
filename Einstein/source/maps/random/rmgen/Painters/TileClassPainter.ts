/**
 * Marks the affected area with the given tileclass.
 */
class TileClassPainter implements IPainter {
    tileClass: TileClass;
    constructor(tileClass: TileClass) {
        this.tileClass = tileClass;
    }

    paint(area: Area) {
        for (let point of area.getPoints())
            this.tileClass.add(point);
    }
}