//////////////////////////////////////////////////////////////////////
//	RangeOp
//
//	Class for efficiently finding number of points within a range
//
//////////////////////////////////////////////////////////////////////

class RangeOp {

    nn: number;
    vals: Int16Array;

    constructor(size: number) {
        // Get smallest power of 2 which is greater than or equal to size
        this.nn = 1;
        while (this.nn < size) {
            this.nn *= 2;
        }

        this.vals = new Int16Array(2 * this.nn);	// int16
    }

    set(pos, amt): void {
        this.add(pos, amt - this.vals[this.nn + pos]);
    }

    add(pos, amt) {
        for (var s = this.nn; s >= 1; s /= 2) {
            this.vals[s + pos] += amt;
            pos = Math.floor(pos / 2);
        }
    }

    get(start, end) {
        var ret = 0;
        var i = 1;
        var nn = this.nn;

        // Count from start to end by powers of 2
        for (; start + i <= end; i *= 2) {
            if (start & i) {	// For each bit in start
                ret += this.vals[nn / i + Math.floor(start / i)];
                start += i;
            }
        }

        //
        while (i >= 1) {
            if (start + i <= end) {
                ret += this.vals[nn / i + Math.floor(start / i)];
                start += i;
            }
            i /= 2;
        }

        return ret;
    }
}