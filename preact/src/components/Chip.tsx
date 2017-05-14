import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';

export interface ChipProps extends PassthroughProps {
    image?: string;
}

export class Chip extends Component<ChipProps, {}> {
    public render() {
        const {
            image,
            children
        } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-chip');

        return <div {...pb.render()}>
            { image && <img src={image} /> }
            <span class="umd-chip__text">{children}</span>
        </div>;
    }
}
