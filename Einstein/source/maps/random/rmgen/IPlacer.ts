interface IPlacer {
    place(constraint: IConstraint): Vector2D[];
}

interface ICenteredPlacer extends IPlacer {
    setCenterPosition(center: Vector2D): void;
}