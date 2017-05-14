import { h, Component, ComponentProps } from 'preact';
import Portal from 'preact-portal';

import { PassthroughProps, PropBuilder } from '../props';
import { Ripple } from './Ripple';

export interface MenuProps extends PassthroughProps {
    position?: string;
}

export class Menu extends Component<MenuProps, { visible?: boolean; }> {
    public static defaultProps: MenuProps = {
        position: 'top left',
    }

    private container: Element;
    private menuStyle: { [key: string]: any } = {
        position: 'absolute',
    };

    private get yPos() {
        const [yPos] = this.props.position.split(' ');
        return (yPos === 'top' || yPos === 'bottom') ? yPos : 'top';
    }
    private get xPos() {
        const [, xPos] = this.props.position.split(' ');
        return (xPos === 'left' || xPos === 'right') ? xPos : 'left';
    }

    public open(trigger?: HTMLElement) {
        if (trigger) {
            const bcr = this.getScreenRect(trigger);
            this.menuStyle[this.yPos] = `${bcr[this.yPos]}px`;
            this.menuStyle[this.xPos] = `${bcr[this.xPos]}px`;
            this.menuStyle['min-width'] = `${bcr.width}px`;
            this.menuStyle['transform-origin'] = this.props.position;
        }

        this.setState({ visible: true });
    }

    public close() {
        this.setState({ visible: false });
    }

    public render() {
        const {
            children
        } = this.props;

        const {
            visible
        } = this.state;

        const pb = new PropBuilder(this)
            .withBaseClass('umd-menu');

        return (
            <Portal into="body">
                { visible && <div ref={container => this.container = container}
                    class="umd-menu-container"
                    onClick={() => this.close()}>
                    <div {...pb.render()} style={this.menuStyle}>
                        {children}
                    </div>
                </div> }
            </Portal>
        )
    }

    private getScreenRect(el: HTMLElement): ClientRect {
        const { top, left, bottom, right, width, height } = el.getBoundingClientRect();

        return {
            top, left, width, height,
            right: window.innerWidth - right,
            bottom: window.innerHeight - bottom,
        }
    }
}

export class MenuItem extends Component<PassthroughProps, {}> {
    public render() {
        const {
            children
        } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-menu-item');

        return <div {...pb.render()}>
            {children}
            <Ripple />
        </div>;
    }
}
