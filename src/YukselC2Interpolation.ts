import { Vector2 } from 'three';
import QuadraticBezierInterpolation from './QuadraticBezierInterpolation';

export default class YukselC2Interpolation {

    static interpolationFunc: QuadraticBezierInterpolation[] = [];

    static pointsLength = 0;

    static SmoothPolygon(points: [number, number][]) {

        this.pointsLength = points.length;

        const pts = [];
        for (let i = 0; i < points.length; i++) {

            pts.push(new Vector2(points[i][0], points[i][1]));

        }
        this.generateInterpolationFunc(pts);

        const tempPoints = [];
        for (let i = 0; i < pts.length - 1; i++) {

            for (let theta = 0; theta < Math.PI / 2; theta += 0.01) {

                tempPoints.push(this.getPoint(i, theta));

            }

        }

        const rs = [];
        for (let i = 0; i < tempPoints.length; i++) {

            rs.push([tempPoints[i].x, tempPoints[i].y]);

        }
        return rs;

    }

    static generateInterpolationFunc(pts: Vector2[]) {

        this.interpolationFunc = [];
        for (let i = 0; i < pts.length - 2; i++) {

            this.interpolationFunc.push(new QuadraticBezierInterpolation(pts[i], pts[i + 1], pts[i + 2]));

        }

    }

    static getPoint(n: number, theta: number) {

        if (n === 0) {

            return this.scaledCall(0, theta);

        }
        if (n === this.pointsLength - 2) {

            return this.scaledCall(n - 1, theta + Math.PI / 2);

        }
        return this.blend(n - 1, n, theta);

    }

    static scaledCall(n: number, theta: number) {

        return this.interpolationFunc[n].interpolate(theta / Math.PI);

    }

    static blend(n1: number, n2: number, theta: number) {

        return this.scaledCall(n1, theta + Math.PI / 2).clone().multiplyScalar(Math.cos(theta) * Math.cos(theta)).add(this.scaledCall(n2, theta).clone().multiplyScalar(Math.sin(theta) * Math.sin(theta)));

    }

}
