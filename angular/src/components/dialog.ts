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
    ComponentFactoryResolver
} from '@angular/core';

import { ComponentPortal } from '../core/portal';

@Injectable()
export class MdaDialog {
    constructor(private injector: Injector) {
    }

    public open<T>(component: Type<T>) {
        const dialog = new ComponentPortal(MdaDialogContainer, this.injector);
        const content = new ComponentPortal(component, this.injector);

        const dialogRef = new MdaDialogRef(() => {
            content.detach();
            dialog.detach();
        });
        const dialogRefProvider = { provide: MdaDialogRef, useValue: dialogRef };

        dialog.inject(dialogRefProvider);
        content.inject(dialogRefProvider);

        dialog.attach(document.body);
        content.attach(dialog.instance.dialogElementRef.nativeElement);
    }
}

export class MdaDialogRef {
    constructor(private destroyFn: () => void) {
    }

    public close() {
        this.destroyFn();
    }
}

@Component({
    selector: 'mda-dialog-container',
    template: `
        <div #dialog class="umd-dialog">
        </div>
    `
})
export class MdaDialogContainer {
    @HostBinding('class')
    private classes: string = 'umd-dialog-container';

    @ViewChild('dialog', { read: ElementRef })
    public dialogElementRef: ElementRef;

    constructor(private elementRef: ElementRef, private dialogRef: MdaDialogRef) {
    }

    @HostListener('click', ['$event.target'])
    public onClick(target: HTMLElement) {
        if (target === this.elementRef.nativeElement) {
            console.log('should close dialog');
            this.dialogRef.close();
        }
    }
}

@Directive({
    selector: 'mda-dialog-title'
})
export class MdaDialogTitle {
    @HostBinding('class')
    private classes: string = 'umd-dialog-title umd-dialog--includes-padding';
}

@Directive({
    selector: 'mda-dialog-content'
})
export class MdaDialogContent {
    @HostBinding('class')
    private classes: string = 'umd-dialog-content umd-dialog--includes-padding';
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
