import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Question } from '../question/question';

import { DataService } from '../data.service';
import { ProgressService } from '../progress.service';


@Component({
  selector: 'quiz-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  total: number;
  segment: number;
  dividers: number[];
  questions: Question[];

  constructor(
    private dataService: DataService,
    public progressService: ProgressService
  ) { }

  ngOnInit() {
    this.total = this.dataService.getQuestions().length;
    this.questions = this.dataService.getQuestions();
    this.segment = 1 / this.total * 100;
    this.dividers = this.calculateDividers(this.questions);
  }

  calculateDividers(arr): number[]  {
    let i;
    const  dividers = [];
    const  length = arr.length - 1;
    for (i = 0; i < length; i++) {
      dividers.push(i);
    }
    return dividers;
  }
}
