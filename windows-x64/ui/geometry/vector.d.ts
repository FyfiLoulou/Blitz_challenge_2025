export type SerializedVector = ReturnType<Vector["serialize"]>;
export declare class Vector {
    private _x;
    private _y;
    constructor(x: number, y: number);
    static fromPosition(position: {
        x: number;
        y: number;
    }): Vector;
    get x(): number;
    get y(): number;
    get magnitude(): number;
    add(otherPoint: Vector): Vector;
    subtract(otherPoint: Vector): Vector;
    equals(other: {
        x: number;
        y: number;
    }): boolean;
    serialize(): {
        x: number;
        y: number;
    };
    toString(): string;
}
