import {
    Type,
    ViewContainerRef,
    Injector,
    ComponentRef,
    ReflectiveInjector,
    Provider,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef
} from '@angular/core';

export interface Portal {
    attach(container: HTMLElement): void;
    detach(): void;
}

export class ComponentPortal<T> implements Portal {
    public compRef: ComponentRef<T>;
    public injector: Injector;

    private viewRef: ViewContainerRef;
    private destroy: () => void;

    constructor(component: Type<T>, injector: Injector)
    constructor(component: Type<T>, viewRef: ViewContainerRef)
    constructor(private component: Type<T>, viewRefOrInjector: any) {
        if (viewRefOrInjector.createComponent) {
            this.injector = viewRefOrInjector.parentInjector;
            this.viewRef = viewRefOrInjector;
        } else {
            this.injector = viewRefOrInjector;
        }
    }

    public get instance(): T {
        return this.compRef.instance;
    }

    public inject(...providers: Provider[]) {
        this.injector = ReflectiveInjector.resolveAndCreate(providers, this.injector);
    }

    public attach(container: HTMLElement) {
        container.appendChild(this.create());
    }

    public detach() {
        this.destroy();
        this.compRef = null;
    }

    private get factoryResolver(): ComponentFactoryResolver {
        return this.injector.get(ComponentFactoryResolver);
    }

    private get applicationRef(): ApplicationRef {
        return this.injector.get(ApplicationRef);
    }

    private create(): HTMLElement {
        if (!this.compRef) {
            const factory = this.factoryResolver.resolveComponentFactory(this.component);

            if (this.viewRef) {
                this.compRef = this.viewRef.createComponent(factory, this.viewRef.length, this.injector);
                this.destroy = () => this.compRef.destroy();
            } else {
                this.compRef = factory.create(this.injector);
                this.applicationRef.attachView(this.compRef.hostView);
                this.destroy = () => {
                    this.applicationRef.detachView(this.compRef.hostView);
                    this.compRef.destroy();
                }
            }
        }

        return (<EmbeddedViewRef<any>> this.compRef.hostView).rootNodes[0];
    }
}
