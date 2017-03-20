import { Directive, HostBinding, Input, ElementRef } from '@angular/core';
import { HostClasses, DynamicClass } from '../core/classes';

export type ToolbarType = 'app';

@HostClasses('umd-toolbar')
@Directive({
    selector: 'mda-toolbar'
})
export class MdaToolbar {
    @Input()
    @DynamicClass('umd-toolbar--$1')
    public type: ToolbarType = 'app';

    @Input()
    @HostBinding('attr.data-umd-variant')
    public variant: string = 'default';

    @Input()
    public set flat(flat: boolean) {
        this.isFlat = flat !== false && flat !== null;
    }

    @HostBinding('class.umd-toolbar--flat')
    public isFlat = false;

    constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit() {}
}
