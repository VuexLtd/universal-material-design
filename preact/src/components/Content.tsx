import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';

export class Content extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-content');

        return <div {...pb.render()}>{children}</div>;
    }
}
