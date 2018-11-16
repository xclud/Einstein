enum ElevationMode {
    Elevation_ExcludeMin_ExcludeMax = 0,
    Elevation_IncludeMin_ExcludeMax = 1,
    Elevation_ExcludeMin_IncludeMax = 2,
    Elevation_IncludeMin_IncludeMax = 3,
}

/**
 * HeightPlacer constants determining whether the extrema should be included by the placer too.
 */
class HeightPlacer implements IPlacer {
    withinHeightRange: (position: Vector2D) => boolean;


    /**
     * The HeightPlacer provides all points between the minimum and maximum elevation that meet the Constraint,
     * even if they are far from the passable area of the map.
     */
    constructor(mode: ElevationMode, minElevation: number, maxElevation: number) {
        this.withinHeightRange =
            mode == ElevationMode.Elevation_ExcludeMin_ExcludeMax ? position => g_Map.getHeight(position) > minElevation && g_Map.getHeight(position) < maxElevation :
                mode == ElevationMode.Elevation_IncludeMin_ExcludeMax ? position => g_Map.getHeight(position) >= minElevation && g_Map.getHeight(position) < maxElevation :
                    mode == ElevationMode.Elevation_ExcludeMin_IncludeMax ? position => g_Map.getHeight(position) > minElevation && g_Map.getHeight(position) <= maxElevation :
                        mode == ElevationMode.Elevation_IncludeMin_IncludeMax ? position => g_Map.getHeight(position) >= minElevation && g_Map.getHeight(position) <= maxElevation :
                            undefined;

        if (!this.withinHeightRange)
            throw new Error("Invalid HeightPlacer mode: " + mode);
    }

    place(constraint: IConstraint): Vector2D[] {
        let mapSize = g_Map.getSize();

        var ret = getPointsInBoundingBox(getBoundingBox([new Vector2D(0, 0), new Vector2D(mapSize - 1, mapSize - 1)])).filter(
            point => this.withinHeightRange(point) && constraint.allows(point));

        return ret;
    }
}