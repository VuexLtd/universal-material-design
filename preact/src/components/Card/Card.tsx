import { h, Component } from 'preact';

export class Card extends Component<{ fill?: boolean, style?: string | { [key: string]: any } }, {}> {
    public render() {
        const { children, fill, style } = this.props;

        const classes = ['umd-card'];
        fill && classes.push('umd-card--full-width');

        return <div class={classes.join(' ')} style={style}>{children}</div>;
    }
}

export class CardText extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <div class="umd-card-text umd-card--includes-padding">{children}</div>;
    }
}

export class CardMedia extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <div class="umd-card-media">{children}</div>;
    }
}

export class CardTitle extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <div class="umd-card-title umd-card--includes-padding">{children}</div>;
    }
}

export class CardSubtitle extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <div class="umd-card-subtitle umd-card--includes-padding">{children}</div>;
    }
}

export class CardActions extends Component<{ vertical?: boolean }, {}> {
    public render() {
        const { children, vertical } = this.props;
        const classes = ['umd-card-actions'];

        if (vertical) {
            classes.push('umd-card-actions--vertical');
        }

        return <div class={classes.join(' ')}>{children}</div>;
    }
}

export class CardMediaArea extends Component<{ media: JSX.Element }, {}> {
    public render() {
        const { children, media } = this.props;
        return <div class="umd-card-media-area">
            <div class="umd-card-media-area__content">{children}</div>
            <div class="umd-card-media-area__media">{media}</div>
        </div>;
    }
}

export * from './CardHeader';
