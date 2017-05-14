import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';
import { Ripple } from './Ripple';

export interface ButtonProps extends PassthroughProps {
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
        const pb = new PropBuilder(this)
            .withBaseClass('umd-button')
            .maybeClass('&--dense', dense)
            .maybeClass('&--flat', flat)
            .maybeClass('&--disabled', disabled)
            .maybeClass('&--icon', icon)
            .maybeClass('&--fab', fab)
            .maybeClass('&--mini-fab', miniFab);

        return (
            <button
                {...pb.render()}
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
