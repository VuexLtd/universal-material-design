import { h, Component } from 'preact';

import { Ripple } from './Ripple';

export interface ButtonProps {
    type?: 'button' | 'submit';
    dense?: boolean;
    flat?: boolean;
    disabled?: boolean;
    icon?: boolean;
    fab?: boolean;
    miniFab?: boolean;
    variant?: string;

    onClick?: JSX.MouseEventHandler;
}

export class Button extends Component<ButtonProps, {}> {
    static defaultProps: ButtonProps = {
        type: 'button',
        dense: false,
        flat: false,
        disabled: false,
        icon: false,
        fab: false,
        miniFab: false,
        variant: 'default',
    };

    public render() {
        const {
            children,
            type,
            dense,
            flat,
            disabled,
            icon,
            fab,
            miniFab,
            variant,

            onClick,
        } = this.props;

        const btnClasses = ['umd-button'];

        if (dense) {
            btnClasses.push('umd-button--dense');
        }

        if (flat) {
            btnClasses.push('umd-button--flat');
        }

        if (disabled) {
            btnClasses.push('umd-button--disabled');
        }

        if (icon) {
            btnClasses.push('umd-button--icon');
        }

        if (fab) {
            btnClasses.push('umd-button--fab');
        }

        if (miniFab) {
            btnClasses.push('umd-button--mini-fab');
        }

        return (
            <button
                class={btnClasses.join(' ')}
                type={type}
                onClick={onClick}
                data-umd-variant={variant}>
                <div class="umd-button__inner">
                    {children}
                    <Ripple />
                </div>
            </button>
        )
    }
}
