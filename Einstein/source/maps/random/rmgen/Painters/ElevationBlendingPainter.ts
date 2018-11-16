/**
 * The ElevationBlendingPainter sets the elevation of each point of the given area to the weighted targetHeight.
 */
class ElevationBlendingPainter implements IPainter {
    targetHeight: number;
    strength: number;

    constructor(targetHeight: number, strength: number) {
        this.targetHeight = targetHeight;
        this.strength = strength;
    }

    paint(area: Area) {
        for (let point of area.getPoints())
            g_Map.setHeight(point, this.strength * this.targetHeight + (1 - this.strength) * g_Map.getHeight(point));
    }
}
