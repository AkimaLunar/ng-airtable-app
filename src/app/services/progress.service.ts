import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Progress } from '../shared/progress/progress';

@Injectable()

export class ProgressService {
    counter = 0;
    total: Subject<number> = new BehaviorSubject<number>(null);

    setTotal(num: number) {
        this.total.next(num);
    }

    public increment(): void {
        this.counter++;
    }
    public reset(): void {
        this.counter = 0;
    }
}
