import { h, Component } from 'preact';
import { RippleController, Coord2d } from '@material-design/core';

export interface RippleProps {
    color?: string;
}

export class Ripple extends Component<RippleProps, {}> {
    static defaultProps: RippleProps = {
    };

    private rippleController = new RippleController({ color: this.props.color });

    constructor(props?: RippleProps) {
        super(props);
    }

    public render() {
        return <div class="umd-ripple-container"></div>;
    }

    public shouldComponentUpdate() {
        return false;
    }

    public componentWillReceiveProps(props: RippleProps) {
        if (props.color !== this.props.color) {
            this.rippleController.options.color = props.color;
        }
    }

    public componentDidMount(): void {
        this.rippleController.init(this.base);
    }

    public componentWillUnmount(): void {
        this.rippleController.destroy();
    }
}
