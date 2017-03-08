import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'mda-chip',
    template: `
        <img [src]="image" *ngIf="image">
        <span class="umd-chip__text"><ng-content></ng-content></span>
    `
})
export class MdaChip {
    @HostBinding('class.umd-chip')
    public _ = true;

    @Input()
    public image: string;
}
