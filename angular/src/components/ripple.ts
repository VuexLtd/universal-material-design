import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { RippleRef, RippleController, Coord2d } from '@material-design/core';

@Directive({
    selector: 'mda-ripple,[mdaRipple]',
})
export class MdaRipple implements AfterViewInit, OnDestroy {
    private rippleController = new RippleController();
    private isAttribute = false;

    @Input('mdaRippleColor')
    public set color(color: string) {
        this.rippleController.options.color = color;
    }

    @Input()
    public set mdaRipple(mdaRipple: boolean) {
        this.isAttribute = true;
    }

    constructor(private elementRef: ElementRef) {
    }

    public ngAfterViewInit() {
        const el = this.getElement();
        this.rippleController.init(el, el);
    }

    public ngOnDestroy() {
        this.rippleController.destroy();
    }

    private getElement() {
        let element: HTMLElement = this.elementRef.nativeElement;
        if (this.isAttribute) {
            return element;
        }

        return element.parentElement;
    }
}
