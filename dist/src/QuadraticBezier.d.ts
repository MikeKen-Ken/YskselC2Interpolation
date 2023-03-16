import { Vector2 } from 'three';
export default class QuadraticBezier {
    private p0;
    private p1;
    private p2;
    constructor(p0: Vector2, p1: Vector2, p2: Vector2);
    interpolate(t: number): Vector2;
}
