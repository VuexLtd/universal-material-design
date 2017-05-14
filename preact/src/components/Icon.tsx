import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';

export interface IconProps extends PassthroughProps {
    /**
     * The name of the icon.
     * A list of supported icons can be found here: https://material.io/icons/
     */
    icon: string;

    /**
     * If true, the icon will not have any padding applied.
     */
    noClearance?: boolean;

    size?: 'normal' | 'dense';
}

export class Icon extends Component<IconProps, {}> {
    static defaultProps: Partial<IconProps> = {
        size: 'normal',
    };

    public render() {
        const {
            icon,
            noClearance,
            size,
        } = this.props;

        const pb = new PropBuilder(this)
            .withBaseClass('umd-icon')
            .addClass(`&--size-${size}`)
            .maybeClass('&--no-clearance', noClearance)

        return <i {...pb.render()}>{icon}</i>;
    }
}
