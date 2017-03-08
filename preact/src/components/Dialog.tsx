import { h, Component, PreactHTMLAttributes } from 'preact';
import Portal from 'preact-portal';

export interface DialogProps {
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

        return (
            <Portal into="body">
                { visible && <div ref={container => this.container = container}
                    class="umd-dialog-container"
                    onClick={this.hideIfContainer}>
                    <div class="umd-dialog">
                        {children}
                    </div>
                </div> }
            </Portal>
        )
    }
}

export class DialogTitle extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <div class="umd-dialog-title umd-dialog--includes-padding">{children}</div>;
    }
}

export class DialogContent extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <div class="umd-dialog-content umd-dialog--includes-padding">{children}</div>;
    }
}


export class DialogActions extends Component<{ vertical?: boolean }, {}> {
    public render() {
        const { children, vertical } = this.props;
        const classes = ['umd-dialog-actions'];

        if (vertical) {
            classes.push('umd-dialog-actions--vertical');
        }

        return <div class={classes.join(' ')}>{children}</div>;
    }
}
