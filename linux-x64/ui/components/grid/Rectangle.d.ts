import { ColorSource } from "pixi.js";
import { FC } from "react";
import { Vector } from "../../types";
interface RectangleProps {
    color: ColorSource;
    lineWidth: number;
    fillColor?: ColorSource;
    fillAlpha?: number;
    position: Vector;
    length: number;
    width: number;
}
export declare const Rectangle: FC<RectangleProps>;
export {};
