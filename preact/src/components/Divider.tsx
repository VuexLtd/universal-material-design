import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';

export class Divider extends Component<PassthroughProps, {}> {
    public render() {
        const pb = new PropBuilder(this)
            .withBaseClass('umd-divider');
        return <div {...pb.render()}></div>;
    }
}
