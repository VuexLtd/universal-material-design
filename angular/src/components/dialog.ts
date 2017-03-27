import {
    Directive,
    HostBinding,
    Input,
    Component,
    ViewChild,
    ElementRef,
    HostListener,
    Injectable,
    Injector,
    Type,
    ComponentFactoryResolver,
    TemplateRef,
    ViewContainerRef,
    EventEmitter,
    OpaqueToken,
} from '@angular/core';

import { Portal, ComponentPortal, TemplatePortal } from '../core/portal';
import { HostClasses } from '../core/classes';

export const MdaDialogArgs = new OpaqueToken('mdaDialogArgs');

@Injectable()
export class MdaDialog {
    constructor(private injector: Injector) {
    }

    public open<T>(component: Type<T> | TemplateRef<T>, args?: any): MdaDialogRef {
        const dialog = new ComponentPortal(MdaDialogContainer, this.injector);

        let content: Portal;

        if (component instanceof TemplateRef) {
            if (args) {
                throw new Error('Cannot provide arguments to a template ref dialog');
            }

            content = new TemplatePortal(component, null);
        } else {
            content = new ComponentPortal(component, this.injector);
        }

        const dialogRef = new MdaDialogRef(() => {
            content.detach();
            dialog.detach();
        });
        const dialogRefProvider = { provide: MdaDialogRef, useValue: dialogRef };
        const dialogArgsProvider = { provide: MdaDialogArgs, useValue: args };

        dialog.inject(dialogRefProvider);
        if (content instanceof ComponentPortal) {
            content.inject(dialogRefProvider, dialogArgsProvider);
        }

        dialog.attach(document.body);
        dialog.instance.attachPortal(content);

        return dialogRef;
    }
}

export class MdaDialogRef {
    public closed = new EventEmitter<any>();

    constructor(private destroyFn: () => void) {
    }

    public close(value?: any) {
        this.destroyFn();
        this.closed.emit(value);
    }
}

@HostClasses('umd-dialog-container')
@Component({
    selector: 'mda-dialog-container',
    template: `
        <div #dialog class="umd-dialog">
        </div>
    `
})
export class MdaDialogContainer {
    @ViewChild('dialog', { read: ElementRef })
    public dialogElementRef: ElementRef;

    constructor(
        private elementRef: ElementRef,
        private dialogRef: MdaDialogRef,
        private viewRef: ViewContainerRef,
    ) {
    }

    @HostListener('click', ['$event.target'])
    public onClick(target: HTMLElement) {
        if (target === this.elementRef.nativeElement) {
            this.dialogRef.close();
        }
    }

    public attachPortal(portal: Portal) {
        if (!(<any> portal).viewRef) {
            (<any> portal).viewRef = this.viewRef;
        }

        portal.attach(this.dialogElementRef.nativeElement);
    }

    public ngAfterViewInit() {}
}

@HostClasses('umd-dialog-title umd-dialog--includes-padding')
@Directive({
    selector: 'mda-dialog-title'
})
export class MdaDialogTitle {
    constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit() {}
}

@HostClasses('umd-dialog-content umd-dialog--includes-padding')
@Directive({
    selector: 'mda-dialog-content'
})
export class MdaDialogContent {
    constructor(private elementRef: ElementRef) {}

    public ngAfterViewInit() {}
}

@Directive({
    selector: 'mda-dialog-actions',
})
export class MdaDialogActions {
    @HostBinding('class.umd-dialog-actions')
    public _ = true;

    @Input()
    public set vertical(vertical: boolean) {
        this.isVertical = vertical !== false && vertical !== null;
    }

    @HostBinding('class.umd-dialog-actions--vertical')
    public isVertical = false;
}
