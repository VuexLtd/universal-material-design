import { Component } from 'preact';

export interface PassthroughProps {
    class?: string;
    className?: string;
    style?: any;
}

export class PropBuilder {
    private classes = new Set<string>();
    private baseClass: string;

    constructor(private comp: Component<PassthroughProps, any>) {
        if (comp.props.class != null) {
            comp.props.class.split(' ').forEach(cla => this.classes.add(cla));
        }
        if (comp.props.className != null) {
            comp.props.className.split(' ').forEach(cla => this.classes.add(cla));
        }
    }

    public withBaseClass(className: string, include = true): this {
        if (include) {
            this.addClass(className);
        }
        this.baseClass = className;
        return this;
    }

    public addClass(className): this {
        if (this.baseClass != null && className.startsWith('&')) {
            className = this.baseClass + className.slice(1);
        }

        this.classes.add(className);
        return this;
    }

    public maybeClass(className: string, condition: boolean): this {
        if (!condition) {
            return this;
        }

        return this.addClass(className);
    }

    public render() {
        return {
            class: Array.from(this.classes).join(' '),
            style: this.comp.props.style,
        };
    }
}
