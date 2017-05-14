import { h, Component, PreactHTMLAttributes } from 'preact';
import Portal from 'preact-portal';

import { PassthroughProps, PropBuilder } from '../props';

export interface DialogProps extends PassthroughProps {
}

export class Dialog extends Component<DialogProps, { visible?: boolean; }> {
    private container: Element;

    public show() {
        this.setState({ visible: true });
    }

    public hide() {
        this.setState({ visible: false });
    }

    private hideIfContainer = (evt: MouseEvent) => {
        if (evt.target === this.container) {
            this.hide();
        }
    }

    public render() {
        const {
            children
        } = this.props;

        const {
            visible
        } = this.state;

        const pb = new PropBuilder(this)
            .withBaseClass('umd-dialog');

        return (
            <Portal into="body">
                { visible && <div ref={container => this.container = container}
                    class="umd-dialog-container"
                    onClick={this.hideIfContainer}>
                    <div {...pb.render()}>
                        {children}
                    </div>
                </div> }
            </Portal>
        )
    }
}

export class DialogTitle extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-dialog-title')
            .addClass('umd-dialog--includes-padding');

        return <div {...pb.render()}>{children}</div>;
    }
}

export class DialogContent extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-dialog-content')
            .addClass('umd-dialog--includes-padding');

        return <div {...pb.render()}>{children}</div>;
    }
}


export class DialogActions extends Component<{ vertical?: boolean } & PassthroughProps, {}> {
    public render() {
        const { children, vertical } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-dialog-actions')
            .maybeClass('&--vertical', vertical);

        return <div {...pb.render()}>{children}</div>;
    }
}
