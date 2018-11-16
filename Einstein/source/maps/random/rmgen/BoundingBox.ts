class BoundingBox {
    min: Vector2D;
    max: Vector2D;

    constructor(min: Vector2D, max: Vector2D) {
        this.min = min;
        this.max = max;
    }

    get top(): number {
        return undefined;
    }

    get left(): number {
        return undefined;
    }

    get right(): number {
        return undefined;
    }

    get bottom(): number {
        return undefined;
    }
}