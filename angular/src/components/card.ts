import { Component, Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: 'mda-card'
})
export class MdaCard {
    @HostBinding('class')
    private classes: string = 'umd-card';
}

@Directive({
    selector: 'mda-card-text'
})
export class MdaCardText {
    @HostBinding('class')
    private classes: string = 'umd-card-text umd-card--includes-padding';
}

@Directive({
    selector: 'mda-card-media'
})
export class MdaCardMedia {
    @HostBinding('class')
    private classes: string = 'umd-card-media';
}

@Directive({
    selector: 'mda-card-title'
})
export class MdaCardTitle {
    @HostBinding('class')
    private classes: string = 'umd-card-title umd-card--includes-padding';
}

@Directive({
    selector: 'mda-card-subtitle'
})
export class MdaCardSubtitle {
    @HostBinding('class')
    private classes: string = 'umd-card-subtitle umd-card--includes-padding';
}

@Directive({
    selector: 'mda-card-actions',
})
export class MdaCardActions {
    @HostBinding('class.umd-card-actions')
    public _ = true;

    @Input()
    public set vertical(vertical: boolean) {
        this.isVertical = vertical !== false && vertical !== null;
    }

    @HostBinding('class.umd-card-actions--vertical')
    public isVertical = false;
}

@Component({
    selector: 'mda-card-media-area',
    template: `
        <div class="umd-card-media-area__content">
            <ng-content></ng-content>
        </div>
        <div class="umd-card-media-area__media">
            <ng-content select="[media]"></ng-content>
        </div>
    `
})
export class MdaCardMediaArea {
    @HostBinding('class')
    private classes: string = 'umd-card-media-area';
}


@Component({
    selector: 'mda-card-header',
    template: `
        <img class="umd-card-header__avatar" [src]="avatar" *ngIf="avatar">
        <div class="umd-card-header__titles">
            <h1>{{ title }}</h1>
            <h2>{{ subtitle }}</h2>
        </div>
    `
})
export class MdaCardHeader {
    @HostBinding('class')
    private classes: string = 'umd-card-header umd-card--includes-padding';

    @Input()
    public avatar: string;

    @Input()
    public title: string;

    @Input()
    public subtitle: string;
}
