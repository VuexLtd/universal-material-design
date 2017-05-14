import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../../props';

export interface CardHeaderProps extends PassthroughProps {
    avatar?: string;
    title: string;
    subtitle: string;
}

export class CardHeader extends Component<CardHeaderProps, {}> {
    public render() {
        const {
            avatar,
            title,
            subtitle,
        } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-card-header')
            .addClass('umd-card--includes-padding')

        return <div {...pb.render()}>
            {avatar && <img class="umd-card-header__avatar" src={avatar} />}
            <div class="umd-card-header__titles">
                <h1>{ title }</h1>
                <h2>{ subtitle }</h2>
            </div>
        </div>;
    }
}
