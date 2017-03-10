import { ElementRef } from '@angular/core';

export function HostClasses(classes: string): ClassDecorator {
    return (target: Function) => {
        const orig = target.prototype.ngAfterViewInit;
        target.prototype.ngAfterViewInit = function () {
            if (!this.elementRef) {
                console.warn(`[${target.name}] Could not apply host classes, expected elementRef to be available.`);
                return;
            }

            const element: HTMLElement = this.elementRef.nativeElement;
            if (element) {
                classes
                    .split(' ')
                    .forEach(className => element.classList.add(className));
            }

            if (orig) {
                orig.call(this);
            }
        }
    }
}

interface ClassWithElementRef {
    elementRef?: ElementRef;
    ngAfterViewInit?();
}

export function DynamicClass(classTemplate: string): PropertyDecorator {
    return (target: ClassWithElementRef, key: string | symbol) => {
        let initialised = false;
        let className: string;
        let value: any;

        Object.defineProperty(target, key, {
            get: () => value,
            set: function (type) {
                if (type === value) {
                    return;
                }

                let element: HTMLElement;
                if (initialised) {
                    element = this.elementRef.nativeElement;
                }

                element && element.classList.remove(className);
                className = classTemplate.replace('$1', type);
                element && element.classList.add(className);

                value = type;
            }
        })

        const orig = target.ngAfterViewInit;
        target.ngAfterViewInit = function () {
            if (!this.elementRef) {
                console.warn(`[${this.constructor.name}] Could not apply dyanmic class, expected elementRef to be available.`);
                return;
            }

            const element: HTMLElement = this.elementRef.nativeElement;
            if (element && className) {
                element.classList.add(className);
            }
            initialised = true;

            if (orig) {
                orig.call(this);
            }
        }
    }
}
