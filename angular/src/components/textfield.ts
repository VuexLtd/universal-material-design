import { Component, HostBinding, Input, Provider, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const MDA_INPUT_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdaTextField),
    multi: true,
};

@Component({
    selector: 'mda-textfield',
    template: `
        <label
            class="umd-textfield"
            [attr.data-umd-variant]="variant"
            [class.umd-textfield--disabled]="isDisabled"
            [class.umd-textfield--focused]="hasFocus">
            <span
                class="umd-textfield__label"
                [class.umd-textfield__label--floating]="isFloating">
                {{ label }}
            </span>
            <input
                class="umd-textfield__input"
                [type]="type"
                [autofocus]="autofocus"
                [disabled]="disabled"
                [type]="inputType"
                [readonly]="readonly"
                [required]="required"
                [attr.autocomplete]="autocomplete"
                [attr.autocorrect]="autocorrect"
                [attr.autocapitalize]="autocapitalize"
                [attr.list]="list"
                [attr.max]="max"
                [attr.maxlength]="maxlength"
                [attr.min]="min"
                [attr.minlength]="minlength"
                [spellcheck]="spellcheck"
                [attr.step]="step"
                [attr.tabindex]="tabindex"
                [attr.name]="name"
                [(ngModel)]="inputValue"
                (focus)="onFocus($event)"
                (blur)="onBlur($event)">
            <span class="umd-textfield__underline"></span>
        </label>
    `,
    providers: [MDA_INPUT_VALUE_ACCESSOR],
})
export class MdaTextField implements ControlValueAccessor {
    @Input() public label: string = '';
    public value: string = '';

    @Input()
    public variant: string = 'default';

    @Input() public autocomplete: string;
    @Input() public autocorrect: string;
    @Input() public autocapitalize: string;
    @Input() public autofocus: boolean = false;
    @Input() public list: string = null;
    @Input() public max: string | number = null;
    @Input() public maxlength: number = null;
    @Input() public min: string | number = null;
    @Input() public minlength: number = null;
    @Input() public name: string = null;
    @Input() public readonly: boolean = false;
    @Input() public required: boolean = false;
    @Input() public spellcheck: boolean = false;
    @Input() public step: number = null;
    @Input() public tabindex: number = null;
    @Input() public type: string = 'text';

    @Input()
    public set disabled(disabled: boolean) {
        this.isDisabled = disabled !== false && disabled !== null;
    }

    @Output()
    public blur = new EventEmitter<FocusEvent>();

    @Output()
    public focus = new EventEmitter<FocusEvent>();

    public isDisabled = false;
    public hasFocus = false;

    private controlValueOnChange: (_: any) => void = () => undefined;
    private controlValueOnTouch: () => void = () => undefined;

    public get isFloating() {
        return this.hasFocus || !!this.value;
    }

    public onFocus(evt: FocusEvent) {
        this.hasFocus = true;
        this.focus.next(evt);
    }

    public onBlur(evt: FocusEvent) {
        this.hasFocus = false;
        this.blur.next(evt);
        this.controlValueOnTouch();
    }

    @Input('value')
    set inputValue(value: any) {
        if (value !== this.value) {
            this.value = value;
            this.controlValueOnChange(value);
        }
    }

    get inputValue() {
        return this.value;
    }

    // ControlValueAccessor
    public writeValue(value: any) {
        this.value = value;
    }

    public registerOnChange(fn: any) {
        this.controlValueOnChange = fn;
    }

    public registerOnTouched(fn: any) {
        this.controlValueOnTouch = fn;
    }
}
