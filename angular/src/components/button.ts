import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'button[mdaButton],button[mdaRaisedButton]',
    template: `
        <div class="umd-button__inner" mdaRipple>
            <ng-content></ng-content>
        </div>
    `
})
export class MdaButton {
    @HostBinding('class.umd-button')
    public _ = true;

    @Input()
    public set mdaRaisedButton(raised: boolean) {
        this.isFlat = raised === false || raised === null;
    }

    @Input()
    public set dense(dense: boolean) {
        this.isDense = dense !== false && dense !== null;
    }

    @Input()
    public set icon(icon: boolean) {
        this.isIcon = icon !== false && icon !== null;
    }

    @Input()
    public set disabled(disabled: boolean) {
        this.isDisabled = disabled !== false && disabled !== null;
    }

    @HostBinding('class.umd-button--flat')
    public isFlat = true;

    @HostBinding('class.umd-button--dense')
    public isDense = false;

    @HostBinding('class.umd-button--disabled')
    public isDisabled = false;

    @HostBinding('class.umd-button--icon')
    public isIcon = false;
}
