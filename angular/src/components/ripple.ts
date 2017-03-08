import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';

import { Coord2d } from '../core/types';

@Directive({
    selector: '[mdaRipple]',
})
export class MdaRipple implements AfterViewInit, OnDestroy {
    private ripples = new Set<RippleRef>();
    private activeRipple: RippleRef;

    @Input('mdaRippleColor')
    public color: string = "rgba(0, 0, 0, .1)";

    constructor(private elementRef: ElementRef) {
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    public ngAfterViewInit() {
        const element: HTMLElement = this.elementRef.nativeElement;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    public ngOnDestroy() {
        document.removeEventListener('mouseup', this.onMouseUp);

        this.ripples.forEach(ripple => ripple.remove());
    }

    private onMouseDown(evt: MouseEvent) {
        const element: HTMLElement = this.elementRef.nativeElement;
        this.activeRipple = this.add(Coord2d.fromMouseEvent(evt, 'offset', element), this.color);
        this.activeRipple.trigger(true);

        this.ripples.add(this.activeRipple);
        this.activeRipple.onDestroy = ripple => this.ripples.delete(ripple);
    }

    private onMouseUp() {
        if (this.activeRipple) {
            this.activeRipple.unlock();
        }
    }

    public add(pos: Coord2d, colour: string): RippleRef {
        const ripple = new RippleRef(pos, colour);
        ripple.attach(this.elementRef.nativeElement, this.elementRef.nativeElement);
        return ripple;
    }
}

// TODO: import from core
export class RippleRef {
    public element = document.createElement('div');
    public parent: HTMLElement;
    public locked: boolean = false;
    public done: boolean = false;
    public onDestroy: (ripple: RippleRef) => void = () => undefined;

    constructor(
        public position: Coord2d,
        public colour: string,
    ) {
        this.element.classList.add('umd-ripple');
        this.setStyles({
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: '1px',
            height: '1px',
            background: colour,
            transform: 'translate(-50%, -50%) scale(0)',
            'border-radius': '50%',
            'pointer-events': 'none',
            transition: '0.55s all cubic-bezier(0.0, 0.0, 0.2, 1)',
        });

        this.element.addEventListener('transitionend', () => {
            if (this.done) {
                this.remove();
                return;
            }

            this.done = true;
            if (!this.locked) {
                this.out();
            }
        })
    }

    public attach(container: HTMLElement, parent: HTMLElement = container.parentElement) {
        container.appendChild(this.element);
        this.parent = parent;
    }

    public trigger(lock: boolean = false) {
        this.locked = lock;
        const size = this.distanceToCorner(this.parent.getBoundingClientRect()) * 2
        this.setStyles({ transform: `translate(-50%, -50%) scale(${size})` }, true);
    }

    public unlock() {
        this.out();
    }

    public remove() {
        this.element.parentElement.removeChild(this.element);
        this.onDestroy(this);
    }

    private out() {
        this.setStyles({ opacity: 0 }, true);
    }

    private distanceToCorner(rect: ClientRect) {
        const distX = Math.max(this.position.x, rect.width - this.position.x);
        const distY = Math.max(this.position.y, rect.height - this.position.y);
        return Math.sqrt(distX * distX + distY * distY);
    }

    private setStyles(styles: { [index: string]: any }, defer: boolean = false) {
        if (defer) {
            requestAnimationFrame(() => this.setStyles(styles, false));
            return;
        }

        Object.assign(this.element.style, styles);
    }
}
