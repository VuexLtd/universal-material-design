import { h, Component, cloneElement } from 'preact';
import { Ripple } from './Ripple';

export interface TabBarProps {
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

        const selected = this.state.selected == null ? this.props.selected : this.state.selected;

        const classes = ['umd-tab-bar'];
        const tabs = children.map((child, i) => cloneElement(child, {
            onClick: ({ target }: MouseEvent) => this.selectTab(i, target as HTMLElement),
            active: selected === i,
        }));

        const underlineStyles: any = {
            transform: this.state.underlineTransform
        };

        return <div class={classes.join(' ')} data-umd-variant={variant}>
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

export class TabLabel extends Component<{ onClick?: () => void, active?: boolean }, {}> {
    public render() {
        const {
            children,
            active,
        } = this.props;

        const classes = ['umd-tab-label'];

        active && classes.push('umd-tab-label--active');

        return <div onClick={this.props.onClick} class={classes.join(' ')}>
            {children}
            <Ripple />
        </div>;
    }
}
