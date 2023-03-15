import { Vector2 } from 'three';
import QuadraticBezier from './QuadraticBezier';

export default class QuadraticBezierInterpolation {

    bezier;

    constructor(p0: Vector2, p1: Vector2, p2: Vector2) {

        const square = (x: number) => x * x;
        let ti = 0.5;
        const p20 = p2.clone().sub(p0);
        const p01 = p0.clone().sub(p1);
        const p12 = p1.clone().sub(p2);
        const a = square(p20.length());
        const b = p20.clone().multiplyScalar(3).dot(p01);
        const c = p01.clone().multiplyScalar(3).add(p12).dot(p01);
        const d = -square(p01.length());

        const p = (3 * a * c - b * b) / 3 / a / a;
        const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / 27 / a / a / a;
        // solve u^3 + p u + q = 0
        if (4 * p * p * p + 27 * q * q >= 0) {

            // single real root
            ti = Math.cbrt(-q / 2 + Math.sqrt((q * q) / 4 + (p * p * p) / 27)) + Math.cbrt(-q / 2 - Math.sqrt((q * q) / 4 + (p * p * p) / 27)) - b / 3 / a;

        } else {

            // three real roots
            for (let k = 0; k < 3; k++) {

                const t = 2 * Math.sqrt(-p / 3) * Math.cos((1.0 / 3) * Math.acos(((3 * q) / 2.0 / p) * Math.sqrt(-3 / p)) - (2 * Math.PI * k) / 3.0) - b / 3 / a;
                if (t >= 0 && t <= 1) {

                    ti = t;

                }

            }

        }

        const b1 = p1
            .clone()
            .sub(p0.clone().multiplyScalar(square(1 - ti)))
            .sub(p2.clone().multiplyScalar(square(ti)))
            .divideScalar(2 * (1 - ti) * ti);
        this.bezier = new QuadraticBezier(p0, b1, p2);

    }

    interpolate(t: number) {

        return this.bezier.interpolate(t);

    }

}
