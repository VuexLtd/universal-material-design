import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../../props';

export class Card extends Component<{ fill?: boolean } & PassthroughProps, {}> {
    public render() {
        const { children, fill } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card')
            .maybeClass('&--full-width', fill);

        return <div {...pb.render()}>{children}</div>;
    }
}

export class CardText extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-text')
            .addClass('umd-card--includes-padding');

        return <div {...pb.render()}>{children}</div>;
    }
}

export class CardMedia extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-media');

        return <div {...pb.render()}>{children}</div>;
    }
}

export class CardTitle extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-title')
            .addClass('umd-card--includes-padding');

        return <div {...pb.render()}>{children}</div>;
    }
}

export class CardSubtitle extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-subtitle')
            .addClass('umd-card--includes-padding');

        return <div {...pb.render()}>{children}</div>;
    }
}

export class CardActions extends Component<{ vertical?: boolean } & PassthroughProps, {}> {
    public render() {
        const { children, vertical } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-actions')
            .maybeClass('&--vertical', vertical)

        return <div {...pb.render()}>{children}</div>;
    }
}

export class CardMediaArea extends Component<{ media: JSX.Element } & PassthroughProps, {}> {
    public render() {
        const { children, media } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-media-area');

        return <div {...pb.render()}>
            <div class="umd-card-media-area__content">{children}</div>
            <div class="umd-card-media-area__media">{media}</div>
        </div>;
    }
}

export * from './CardHeader';
