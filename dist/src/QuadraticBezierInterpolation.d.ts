import { Vector2 } from 'three';
import QuadraticBezier from './QuadraticBezier';
export default class QuadraticBezierInterpolation {
    bezier: QuadraticBezier;
    constructor(p0: Vector2, p1: Vector2, p2: Vector2);
    interpolate(t: number): Vector2;
}
