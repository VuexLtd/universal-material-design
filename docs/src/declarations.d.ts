declare module "*.svg" {
    const SvgComponent: preact.ComponentConstructor<any, any>;
    export default SvgComponent;
}

declare module "*.txt" {
    const Raw: string;
    export = Raw;
}
