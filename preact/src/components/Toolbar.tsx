import { h, Component } from 'preact';

export interface ToolbarProps {
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

        const toolbarClasses = [
            'umd-toolbar',
            `umd-toolbar--${type}`
        ];

        flat && toolbarClasses.push('umd-toolbar--flat');

        return (
            <div class={toolbarClasses.join(' ')} data-umd-variant={variant}>
                {children}
            </div>
        )
    }
}
