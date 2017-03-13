import {
    Component,
    HostBinding,
    Input,
    ElementRef,
    EventEmitter,
    Output,
    ContentChildren,
    forwardRef,
    QueryList,
    HostListener,
    AfterContentInit,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'mda-tab-bar',
    template: `
        <ng-content></ng-content>
        <div class="umd-tab-bar__underline" [style.transform]="underlineTransform"></div>
    `
})
export class MdaTabBar implements AfterContentInit {
    @HostBinding('class.umd-tab-bar')
    public _ = true;

    @Input()
    @HostBinding('attr.data-umd-variant')
    public variant: string = 'default';

    @Input()
    public selected: number = 0;

    @Output()
    public selectedChange = new EventEmitter<number>();

    @ContentChildren(forwardRef(() => MdaTabLabel))
    public tabLabels: QueryList<MdaTabLabel>;

    public underlineTransform: SafeStyle = 'scale(0)';

    constructor(public elementRef: ElementRef, private sanitizer: DomSanitizer) {
    }

    ngAfterContentInit() {
        if (this.tabLabels.length > this.selected) {
            requestAnimationFrame(() => this.selectTab(this.tabLabels.find((_, index) => index === this.selected)));
        }
    }

    selectTab(tabLabel: MdaTabLabel) {
        const baseBcr = this.getBCR(this.elementRef);
        const bcr = this.getBCR(tabLabel.elementRef);

        const index = this.tabLabels.toArray().indexOf(tabLabel);
        this.underlineTransform = this.sanitizer.bypassSecurityTrustStyle(
            `translateX(${bcr.left - baseBcr.left}px) scaleX(${bcr.width})`
        );
        this.selectedChange.next(index);

        this.tabLabels.forEach(label => label.active = false);
        tabLabel.active = true;
    }

    private getBCR(elementRef: ElementRef): ClientRect {
        return (<HTMLElement> elementRef.nativeElement).getBoundingClientRect();
    }
}

@Component({
    selector: 'mda-tab-label',
    template: `
        <ng-content></ng-content>
        <mda-ripple></mda-ripple>
    `
})
export class MdaTabLabel {
    @HostBinding('class.umd-tab-label')
    public _ = true;

    constructor(public elementRef: ElementRef, private tabBar: MdaTabBar) {
    }

    @HostBinding('class.umd-tab-label--active')
    public active = false;

    @HostListener('click')
    onClick() {
        this.tabBar.selectTab(this);
    }
}
