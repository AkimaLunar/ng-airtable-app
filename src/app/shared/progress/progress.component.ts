import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Question } from '../../quiz/question/question';
import { Subject } from 'rxjs/Subject';

import { ProgressService } from '../../services/progress.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit, OnDestroy {
  total: number;
  segment: number;
  dividers: number[];

  constructor(
    public progressService: ProgressService
  ) { }

  ngOnInit() {
    this.progressService.total.subscribe((response) => {
      this.total = response;
      this.segment = 1 / this.total * 100;
      this.dividers = this.calculateDividers(this.total);
    });
  }

  calculateDividers(num): number[]  {
    let i;
    const  dividers = [];
    const  length = num - 1;
    for (i = 0; i < length; i++) {
      dividers.push(i);
    }
    return dividers;
  }

  ngOnDestroy() {
    this.progressService.reset();
  }
}
