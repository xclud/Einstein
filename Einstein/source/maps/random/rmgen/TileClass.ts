/**
 * Class that can be tagged to any tile. Can be used to constrain placers and entity placement to given areas.
 */
class TileClass {
    size: number;
    inclusionCount: Int16Array[];
    rangeCount: RangeOp[];

    constructor(size: number) {
        this.size = size;
        this.inclusionCount = [];
        this.rangeCount = [];

        for (let i = 0; i < size; ++i) {
            this.inclusionCount[i] = new Int16Array(size); //int16
            this.rangeCount[i] = new RangeOp(size);
        }
    }

    has(position: Vector2D): boolean {
        return !!this.inclusionCount[position.x] && !!this.inclusionCount[position.x][position.y];
    }

    add(position): void {
        if (!this.inclusionCount[position.x][position.y] && g_Map.validTile(position))
            this.rangeCount[position.y].add(position.x, 1);

        ++this.inclusionCount[position.x][position.y];
    }

    remove(position): void {
        --this.inclusionCount[position.x][position.y];

        if (!this.inclusionCount[position.x][position.y])
            this.rangeCount[position.y].add(position.x, -1);
    }

    countInRadius(position, radius, returnMembers): number {
        let members = 0;
        let nonMembers = 0;
        let radius2 = (radius * radius);

        for (let y = position.y - radius; y <= position.y + radius; ++y) {
            let iy = Math.floor(y);
            if (radius >= 27) // Switchover point before RangeOp actually performs better than a straight algorithm
            {
                if (iy >= 0 && iy < this.size) {
                    let dx = Math.sqrt((radius * radius) - ((y - position.y) * (y - position.y)));

                    let minX = Math.max(Math.floor(position.x - dx), 0);
                    let maxX = Math.min(Math.floor(position.x + dx), this.size - 1) + 1;

                    let newMembers = this.rangeCount[iy].get(minX, maxX);

                    members += newMembers;
                    nonMembers += maxX - minX - newMembers;
                }
            }
            else // Simply check the tiles one by one to find the number
            {
                let dy = iy - position.y;

                let xMin = Math.max(Math.floor(position.x - radius), 0);
                let xMax = Math.max(Math.ceil(position.x + radius), this.size - 1);

                for (let ix = xMin; ix <= xMax; ++ix) {
                    let dx = ix - position.x;
                    if ((dx * dx) + (dy * dy) <= radius2) {
                        if (this.inclusionCount[ix] && this.inclusionCount[ix][iy] && this.inclusionCount[ix][iy] > 0)
                            ++members;
                        else
                            ++nonMembers;
                    }
                }
            }
        }

        if (returnMembers) {
            return members;
        }
        else {
            return nonMembers;
        }
    }

    countMembersInRadius(position, radius): number {
        return this.countInRadius(position, radius, true);
    }

    countNonMembersInRadius(position, radius): number {
        return this.countInRadius(position, radius, false);
    }
}