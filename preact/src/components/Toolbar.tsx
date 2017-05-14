import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';

export interface ToolbarProps extends PassthroughProps {
    type?: 'app';
    variant?: string;
    flat?: boolean;
}

export class Toolbar extends Component<ToolbarProps, {}> {
    static defaultProps: ToolbarProps = {
        type: 'app',
        variant: 'default',
        flat: false,
    };

    public render() {
        const {
            children,
            type,
            variant,
            flat,
        } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-toolbar')
            .addClass(`&--${type}`)
            .maybeClass('&--flat', flat)

        return (
            <div {...pb.render()} data-umd-variant={variant}>
                {children}
            </div>
        )
    }
}
