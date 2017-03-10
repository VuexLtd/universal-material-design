import { Component, Directive, HostBinding, Input, ElementRef } from '@angular/core';
import { HostClasses } from '../core/classes';

@HostClasses('umd-card')
@Directive({
    selector: 'mda-card'
})
export class MdaCard {
    @HostBinding('class.umd-card--full-width')
    public isFullWidth = false;

    @Input()
    public set fill(fill: boolean) {
        this.isFullWidth = fill !== false && fill !== null;
    }

    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-text umd-card--includes-padding')
@Directive({
    selector: 'mda-card-text'
})
export class MdaCardText {
    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-media')
@Directive({
    selector: 'mda-card-media'
})
export class MdaCardMedia {
    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-title umd-card--includes-padding')
@Directive({
    selector: 'mda-card-title'
})
export class MdaCardTitle {
    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-subtitle umd-card--includes-padding')
@Directive({
    selector: 'mda-card-subtitle'
})
export class MdaCardSubtitle {
    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-actions')
@Directive({
    selector: 'mda-card-actions',
})
export class MdaCardActions {
    @Input()
    public set vertical(vertical: boolean) {
        this.isVertical = vertical !== false && vertical !== null;
    }

    @HostBinding('class.umd-card-actions--vertical')
    public isVertical = false;

    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-media-area')
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
    constructor(private elementRef: ElementRef) {}
}

@HostClasses('umd-card-header umd-card--includes-padding')
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
    @Input()
    public avatar: string;

    @Input()
    public title: string;

    @Input()
    public subtitle: string;

    constructor(private elementRef: ElementRef) {}
}
