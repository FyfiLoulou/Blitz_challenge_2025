import { Vector } from '../geometry/vector';
export declare class PathfindingGrid {
    private readonly _grid;
    private readonly _withDiagonalMovement;
    private readonly _width;
    private readonly _height;
    static from2DArray(grid: ReadonlyArray<ReadonlyArray<number>>, withDiagonalMovement?: boolean): PathfindingGrid;
    private constructor();
    getPath(src: Vector, dest: Vector): Vector[] | null;
    getDistances(src: Vector): number[][];
    private internalGetDistances;
    private isPositionValid;
    private getNeighbours;
    private getNeighboursFast;
}
