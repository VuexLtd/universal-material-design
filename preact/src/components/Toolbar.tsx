import { h, Component } from 'preact';

export interface ToolbarProps {
    type?: 'app';
    variant?: string;
}

export class Toolbar extends Component<ToolbarProps, {}> {
    static defaultProps: ToolbarProps = {
        type: 'app',
        variant: 'default',
    };

    public render() {
        const {
            children,
            type,
            variant,
        } = this.props;

        const toolbarClasses = [
            'umd-toolbar',
            `umd-toolbar--${type}`
        ];

        return (
            <div class={toolbarClasses.join(' ')} data-umd-variant={variant}>
                {children}
            </div>
        )
    }
}
