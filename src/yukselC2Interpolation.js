import * as THREE from "three";
import QuadraticBezierInterpolation from "./QuadraticBezierInterpolation";

export default class YskselC2Interpolation {

    interpolationFunc = [];
    pointsLength = 0;

    static SmoothPolygon(points) {
        this.pointsLength = points.length;

        const pts = [];
        for (let i = 0; i < points.length; i++) {
            pts.push(new THREE.Vector2(points[i][0], points[i][1]));
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

    static generateInterpolationFunc(pts) {
        this.interpolationFunc = [];
        for (let i = 0; i < pts.length - 2; i++) {
            this.interpolationFunc.push(new QuadraticBezierInterpolation(pts[i], pts[i + 1], pts[i + 2]));
        }
    }

    static getPoint(n, theta) {
        if (n === 0) {
            return this.scaledCall(0, theta);
        }
        if (n === this.pointsLength - 2) {
            return this.scaledCall(n - 1, theta + Math.PI / 2);
        }
        return this.blend(n - 1, n, theta);
    }

    static scaledCall(n, theta) {
        return this.interpolationFunc[n].interpolate(theta / Math.PI);
    }

    static blend(n1, n2, theta) {
        return this.scaledCall(n1, theta + Math.PI / 2).clone().multiplyScalar(Math.cos(theta) * Math.cos(theta)).add(this.scaledCall(n2, theta).clone().multiplyScalar(Math.sin(theta) * Math.sin(theta)));
    }
}
