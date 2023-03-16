import { Vector2 } from 'three';
import QuadraticBezierInterpolation from './QuadraticBezierInterpolation';
export default class YukselC2Interpolation {
    static interpolationFunc: QuadraticBezierInterpolation[];
    static pointsLength: number;
    static SmoothPolygon(points: [number, number][]): number[][];
    static generateInterpolationFunc(pts: Vector2[]): void;
    static getPoint(n: number, theta: number): Vector2;
    static scaledCall(n: number, theta: number): Vector2;
    static blend(n1: number, n2: number, theta: number): Vector2;
}
