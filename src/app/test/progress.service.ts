import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProgressService {
    counter = 0;
    increment() {
        this.counter++;
    }
    reset() {
        this.counter = 0;
    }
}
