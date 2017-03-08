import { h, Component } from 'preact';

export interface ChipProps {
    image?: string;
}

export class Chip extends Component<ChipProps, {}> {
    public render() {
        const {
            image,
            children
        } = this.props;

        return <div class="umd-chip">
            { image && <img src={image} /> }
            <span class="umd-chip__text">{children}</span>
        </div>;
    }
}
