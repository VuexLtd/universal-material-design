export function incrEnum(enu: { [index: number]: string }, current: number): number {
    let next = current + 1;
    if (enu[next] == null) {
        next = 0;
    }

    return next;
}
