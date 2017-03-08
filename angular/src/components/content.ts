import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: 'mda-content',
})
export class MdaContent {
    @HostBinding('class.umd-content')
    public _ = true;
}
