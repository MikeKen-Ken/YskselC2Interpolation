import { Vector2 } from 'three';

declare class QuadraticBezier {
	private p0;
	private p1;
	private p2;
	constructor(p0: Vector2, p1: Vector2, p2: Vector2);
	interpolate(t: number): Vector2;
}
declare class QuadraticBezierInterpolation {
	bezier: QuadraticBezier;
	constructor(p0: Vector2, p1: Vector2, p2: Vector2);
	interpolate(t: number): Vector2;
}
declare class YukselC2Interpolation {
	static interpolationFunc: QuadraticBezierInterpolation[];
	static pointsLength: number;
	static SmoothPolygon(points: [
		number,
		number
	][]): number[][];
	static generateInterpolationFunc(pts: Vector2[]): void;
	static getPoint(n: number, theta: number): Vector2;
	static scaledCall(n: number, theta: number): Vector2;
	static blend(n1: number, n2: number, theta: number): Vector2;
}

export {
	YukselC2Interpolation as default,
};

