export function calculateOffset(evt: MouseEvent, target: HTMLElement) {
    const offset = {
        x: evt.offsetX,
        y: evt.offsetY,
    };

    if (evt.target === target) {
        return offset;
    }

    let element = <HTMLElement> evt.target;
    let guard = 0;
    while (element !== target) {
        guard++;

        offset.x += element.offsetLeft;
        offset.y += element.offsetTop;
        element = <HTMLElement> element.offsetParent;

        if (guard > 20) {
            // Prevent infinite looping
            break;
        }
    }

    return offset;
}
