/**
 * The MultiPainter applies several painters to the given area.
 */
class MultiPainter implements IPainter {
    painters: IPainter[];

    constructor(painters: IPainter | IPainter[]) {
        if (painters instanceof Array) {
            this.painters = painters;
        } else if (!painters) {
            this.painters = [];
        } else {
            this.painters = [painters];
        }
    }

    paint(area: Area): void {
        for (let painter of this.painters) {
            painter.paint(area);
        }
    }
}