import {
    Component,
    HostBinding,
    Input,
    TemplateRef,
    ViewContainerRef,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    Directive,
    HostListener,
    ElementRef,
} from '@angular/core';
import { TemplatePortal } from '../core/portal';

@Component({
    selector: 'mda-menu',
    exportAs: 'mdaMenu',
    template: `
        <template #template>
            <div #container class="umd-menu-container" (click)="this.containerClose($event.target)">
                <div class="umd-menu" [ngStyle]="menuStyle" [style.transform-origin]="position">
                    <ng-content></ng-content>
                </div>
            </div>
        </template>
    `
})
export class MdaMenu implements OnDestroy, AfterViewInit {
    @ViewChild('template')
    public templateRef: TemplateRef<any>

    @ViewChild('container')
    public containerEl: ElementRef;

    @Input()
    public position = 'top left';

    public menuStyle: { [key: string]: string } = {
        position: 'absolute'
    };

    private portal: TemplatePortal<void>;
    private get yPos() {
        const [yPos] = this.position.split(' ');
        return (yPos === 'top' || yPos === 'bottom') ? yPos : 'top';
    }
    private get xPos() {
        const [, xPos] = this.position.split(' ');
        return (xPos === 'left' || xPos === 'right') ? xPos : 'left';
    }

    constructor(
        private viewRef: ViewContainerRef,
    ) {
    }

    public ngAfterViewInit() {
        this.portal = new TemplatePortal<void>(this.templateRef, this.viewRef);
    }

    public ngOnDestroy() {
        this.portal.detach();
    }

    public open(trigger?: HTMLElement) {
        if (trigger) {
            const bcr = this.getScreenRect(trigger);
            this.menuStyle[this.yPos] = `${bcr[this.yPos]}px`;
            this.menuStyle[this.xPos] = `${bcr[this.xPos]}px`;
            this.menuStyle['min-width'] = `${bcr.width}px`;
        }

        this.portal.attach(document.body);
    }

    public close() {
        this.portal.detach();
    }

    public containerClose(target: HTMLElement) {
        if (target !== this.containerEl.nativeElement) {
            return;
        }

        this.close();
    }

    private getScreenRect(el: HTMLElement): ClientRect {
        const { top, left, bottom, right, width, height } = el.getBoundingClientRect();

        return {
            top, left, width, height,
            right: window.innerWidth - right,
            bottom: window.innerHeight - bottom,
        }
    }
}

@Directive({
    selector: '[mdaMenuTrigger]'
})
export class MdaMenuTrigger {
    @Input('mdaMenuTrigger')
    public menu: MdaMenu;

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('click')
    public toggleMenu() {
        this.menu.open(this.elementRef.nativeElement);
    }
}

@Directive({
    selector: 'mda-menu-item,[mdaMenuItem]'
})
export class MdaMenuItem {
    @HostBinding('class.umd-menu-item')
    public _ = true;

    constructor(private menu: MdaMenu) {
    }

    @HostListener('click')
    public onClick() {
        this.menu.close();
    }
}
