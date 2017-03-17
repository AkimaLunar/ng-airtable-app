import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProgressService {
    counter = 0;
    increment(): void {
        this.counter++;
    }
    reset(): void {
        this.counter = 0;
    }
}
