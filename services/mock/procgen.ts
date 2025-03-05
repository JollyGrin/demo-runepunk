export class SeededRNG {
    private state: number;

    constructor(seed: number) {
        this.state = seed;
    }

    public next(): number {
        const a = 1664525;
        const c = 1013904223;
        const m = Math.pow(2, 32);
        this.state = (a * this.state + c) % m;
        return this.state / m;
    }

    public nextInt(upper : number):  number {
        return Math.floor(this.next() * upper);
    }
}

export function hashStringToInt(str : string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0; // Convert to unsigned 32-bit integer
}
