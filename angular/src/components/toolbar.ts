import { Directive, HostBinding, Input } from '@angular/core';

export type ToolbarType = 'app';

@Directive({
    selector: 'mda-toolbar'
})
export class MdaToolbar {
    @Input()
    public set type(type: ToolbarType) {
        this.classes = `umd-toolbar umd-toolbar--${type}`;
    }

    @HostBinding('class')
    private classes: string = 'umd-toolbar umd-toolbar--app';
}
