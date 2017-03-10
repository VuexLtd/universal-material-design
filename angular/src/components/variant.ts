import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[mdaVariant]'
})
export class MdaVariant {
    @Input('mdaVariant')
    @HostBinding('attr.data-umd-variant')
    public variant: string = 'default';
}
