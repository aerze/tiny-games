export function get(id) {
    return document.getElementById(id);
}

export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Timer {
    /**
     * 
     * @param {number} timeMS in milliseconds
     * @param {'up'|'down'} direction 
     */
    constructor(timeMS, direction) {
        this.timeMS = timeMS;
        this.isCountdown = direction === 'down';
        this.startTime = 0;
        this.doneTime = 0;
        this.completion = null;    
    }
    
    get completed() {
        return this.doneTime !== 0;
    }

    get elapsed() {
        if (this.completed) {
            if (this.isCountdown) return 0;
            return this.doneTime - this.startTime;
        }

        const elapsed = Date.now() - this.startTime;
        if (this.isCountdown) {
            return this.timeMS - elapsed
        }
        return elapsed
    }

    start(timeMS = this.timeMS) {
        this.startTime = Date.now();
        this.completion = new Promise((resolve) => {
            setTimeout(() => {
                this.doneTime = Date.now();
                resolve();
            }, timeMS);
        })
    }
}