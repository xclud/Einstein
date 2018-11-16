/////////////////////////////////////////////////////////////////////
//	Vector2D
//
//	Class for representing and manipulating 2D vectors
//
/////////////////////////////////////////////////////////////////////

// TODO: Type errors if v not instanceof Vector classes
// TODO: Possibly implement in C++
class Vector2D {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.set(x, y);
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }

    // Mutating 2D functions
    //
    // These functions modify the current object,
    // and always return this object to allow chaining

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }

    div(f) {
        this.x /= f;
        this.y /= f;
        return this;
    }

    normalize() {
        let magnitude = this.length();
        if (!magnitude)
            return this;

        return this.div(magnitude);
    }

    /**
     * Rotate a radians anti-clockwise
     */
    rotate(angle) {
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);

        return this.set(
            this.x * cos + this.y * sin,
            -this.x * sin + this.y * cos);
    }

    /**
     * Rotate radians anti-clockwise around the specified rotation center.
     */
    rotateAround(angle, center) {
        return this.sub(center).rotate(angle).add(center);
    }

    /**
     * Convert to integer coordinates.
     */
    round() {
        return this.set(Math.round(this.x), Math.round(this.y));
    }

    floor() {
        return this.set(Math.floor(this.x), Math.floor(this.y));
    }

    toFixed(digits) {
        return this.set(this.x.toFixed(digits), this.y.toFixed(digits));
    }

    // Numeric 2D info functions (non-mutating)
    //
    // These methods serve to get numeric info on the vector, they don't modify the vector

    /**
     * Returns a vector that forms a right angle with this one.
     */
    perpendicular() {
        return new Vector2D(-this.y, this.x);
    }

    /**
     * Computes the scalar product of the two vectors.
     * Geometrically, this is the product of the length of the two vectors and the cosine of the angle between them.
     * If the vectors are orthogonal, the product is zero.
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Computes the non-zero coordinate of the cross product of the two vectors.
     * Geometrically, the cross of the vectors is a 3D vector perpendicular to the two 2D vectors.
     * The returned number corresponds to the area of the parallelogram with the vectors for sides.
     */
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    lengthSquared() {
        return this.dot(this);
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    /**
     * Compare this length to the length of v.
     * @return 0 if the lengths are equal
     * @return 1 if this is longer than v
     * @return -1 if this is shorter than v
     * @return NaN if the vectors aren't comparable
     */
    compareLength(v) {
        return Math.sign(this.lengthSquared() - v.lengthSquared());
    }

    distanceToSquared(v) {
        return euclidDistance2DSquared(this.x, this.y, v.x, v.y);
    };

    distanceTo(v) {
        return euclidDistance2D(this.x, this.y, v.x, v.y);
    }

    /**
     * Returns the angle going from this position to v.
     * Angles are between -PI and PI. E.g., north is 0, east is PI/2.
     */
    angleTo(v) {
        return Math.atan2(v.x - this.x, v.y - this.y);
    }

    // Static 2D functions
    //
    // Static functions that return a new vector object.
    // Note that object creation is slow in JS, so use them only when necessary

    static from3D(v) {
        return new Vector2D(v.x, v.z);
    }

    static add(v1, v2) {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }

    static isEqualTo(v1, v2) {
        return v1.x == v2.x && v1.y == v2.y;
    }

    static mult(v, f) {
        return new Vector2D(v.x * f, v.y * f);
    }

    static div(v, f) {
        return new Vector2D(v.x / f, v.y / f);
    }

    static min(v1, v2) {
        return new Vector2D(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
    }

    static max(v1, v2) {
        return new Vector2D(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
    }

    static average(vectorList) {
        return Vector2D.sum(vectorList).div(vectorList.length);
    }

    static sum(vectorList) {
        // Do not use for...of nor array functions for performance
        let sum = new Vector2D();

        for (let i = 0; i < vectorList.length; ++i)
            sum.add(vectorList[i]);

        return sum;
    };
}

/////////////////////////////////////////////////////////////////////
//	Vector3D
//
//	Class for representing and manipulating 3D vectors
//
/////////////////////////////////////////////////////////////////////
class Vector3D {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.set(x, y, z);
    }

    clone(): Vector3D {
        return new Vector3D(this.x, this.y, this.z);
    };

    // Mutating 3D functions
    //
    // These functions modify the current object,
    // and always return this object to allow chaining

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };

    mult(f) {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        return this;
    };

    div(f) {
        this.x /= f;
        this.y /= f;
        this.z /= f;
        return this;
    };

    normalize() {
        let magnitude = this.length();
        if (!magnitude)
            return this;

        return this.div(magnitude);
    };

    /**
     * Convert to integer coordinates.
     */
    round() {
        return this.set(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    };

    floor() {
        return this.set(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    };

    toFixed(digits) {
        return this.set(this.x.toFixed(digits), this.y.toFixed(digits), this.z.toFixed(digits));
    };

    // Numeric 3D info functions (non-mutating)
    //
    // These methods serve to get numeric info on the vector, they don't modify the vector

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };

    /**
     * Returns a vector perpendicular to the two given vectors.
     * The length of the returned vector corresponds to the area of the parallelogram with the vectors for sides.
     */
    cross(v) {
        return new Vector3D(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x);
    };

    lengthSquared() {
        return this.dot(this);
    };

    length() {
        return Math.sqrt(this.lengthSquared());
    };

    /**
     * Compare this length to the length of v,
     * @return 0 if the lengths are equal
     * @return 1 if this is longer than v
     * @return -1 if this is shorter than v
     * @return NaN if the vectors aren't comparable
     */
    compareLength(v) {
        return Math.sign(this.lengthSquared() - v.lengthSquared());
    };

    distanceToSquared(v) {
        return euclidDistance3DSquared(this.x, this.y, this.z, v.x, v.y, v.z);
    };

    distanceTo(v) {
        return euclidDistance3D(this.x, this.y, this.z, v.x, v.y, v.z);
    };

    horizDistanceToSquared(v) {
        return euclidDistance2DSquared(this.x, this.z, v.x, v.z);
    };

    horizDistanceTo(v) {
        return Math.sqrt(this.horizDistanceToSquared(v));
    };

    /**
     * Returns the angle going from this position to v.
     */
    horizAngleTo(v) {
        return Math.atan2(v.x - this.x, v.z - this.z);
    };

    // Static 3D functions
    //
    // Static functions that return a new vector object.
    // Note that object creation is slow in JS, so use them only when really necessary

    static add(v1, v2) {
        return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };

    static sub(v1, v2) {
        return new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    };

    static isEqualTo(v1, v2) {
        return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
    };

    static mult(v, f) {
        return new Vector3D(v.x * f, v.y * f, v.z * f);
    };

    static div(v, f) {
        return new Vector3D(v.x / f, v.y / f, v.z / f);
    };
}