import { h, Component, cloneElement } from 'preact';

export class RouterLink extends Component<{ href: string }, {}> {
    private context: any;

    public render() {
        const child = cloneElement(this.props.children[0], {
            onClick: () => this.context.navigate(this.props.href),
        });

        return child;
    }
}
