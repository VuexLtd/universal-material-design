import { h, Component, cloneElement } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';
import { Ripple } from './Ripple';

export interface TabBarProps extends PassthroughProps {
    variant?: string;
    selected?: number;
    onSelected?: (tab: string | number) => void;
}

export class TabBar extends Component<TabBarProps, { underlineTransform?: string, selected?: number }> {
    static defaultProps: Partial<TabBarProps> = {
        onSelected: () => undefined,
        variant: 'default',
        selected: 0,
    };

    public componentDidMount() {
        this.selectTab(this.props.selected, this.base.children.item(this.props.selected) as HTMLElement)
    }

    public render() {
        const {
            children,
            variant,
        } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-tab-bar');

        const selected = this.state.selected == null ? this.props.selected : this.state.selected;

        const tabs = children.map((child, i) => cloneElement(child, {
            onClick: ({ target }: MouseEvent) => this.selectTab(i, target as HTMLElement),
            active: selected === i,
        }));

        const underlineStyles: any = {
            transform: this.state.underlineTransform
        };

        return <div {...pb.render()} data-umd-variant={variant}>
            {tabs}
            <div class="umd-tab-bar__underline" style={underlineStyles}></div>
        </div>;
    }

    private selectTab(index: number, element: HTMLElement) {
        const baseBcr = this.base.getBoundingClientRect();
        const bcr = element.getBoundingClientRect();
        this.setState({
            underlineTransform: `translateX(${bcr.left - baseBcr.left}px) scaleX(${bcr.width})`,
            selected: index,
        });

        this.props.onSelected(index);
    }
}

export class TabLabel extends Component<{ onClick?: () => void, active?: boolean } & PassthroughProps, {}> {
    public render() {
        const {
            children,
            active,
        } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-tab-label')
            .maybeClass('&--active', active);

        return <div onClick={this.props.onClick} {...pb.render()}>
            {children}
            <Ripple />
        </div>;
    }
}
