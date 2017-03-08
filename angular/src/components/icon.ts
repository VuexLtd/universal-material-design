import { Directive, HostBinding, Input, ElementRef, Renderer, AfterViewInit } from '@angular/core';

export type IconSize = 'normal' | 'dense';

@Directive({
    selector: 'mda-icon'
})
export class MdaIcon implements AfterViewInit {
    @HostBinding('class.umd-icon')
    public _ = true;

    @Input()
    public set noClearance(clearance: boolean) {
        this.hasClearance = clearance !== false && clearance !== null;
    }

    @HostBinding('class.umd-icon--no-clearance')
    public hasClearance = false;

    @Input()
    public set size(size: IconSize) {
        if (this.currentSize === size) {
            return;
        }

        if (this.currentSize) {
            this.renderer.setElementClass(this.elementRef.nativeElement, `umd-icon--size-${this.currentSize}`, false);
        }
        this.renderer.setElementClass(this.elementRef.nativeElement, `umd-icon--size-${size}`, true);
        this.currentSize = size;
    }

    private currentSize: IconSize;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    public ngAfterViewInit() {
        if (!this.currentSize) {
            this.size = 'normal';
        }
    }
}
