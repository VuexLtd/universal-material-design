import { calculateOffset } from './offset';

export type MousePositionStrategy = 'layer' | 'client' | 'page' | 'offset' | 'screen';

export class Coord2d {
    public static fromXY(x: number, y: number) {
        return new Coord2d(x, y);
    }

    public static fromMouseEvent(evt: MouseEvent, strategy: MousePositionStrategy = 'offset', target?: HTMLElement) {
        if (strategy === 'offset' && target) {
            const offset = calculateOffset(evt, target);
            return new Coord2d(offset.x, offset.y);
        }

        return new Coord2d(evt[`${strategy}X`], evt[`${strategy}Y`]);
    }

    constructor(public x: number, public y: number) {
    }
}
