import { Component, Input, OnInit, OnChanges } from '@angular/core';

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
  segmentArray: Array<number>;
  dividers:number;
  dividerArray: Array<number>;

  constructor(
    private dataService: DataService,
    public progressService: ProgressService
  ) { }

  ngOnInit() {
    this.total = this.dataService.getQuestions().length;
    this.segment = 1 / this.total * 100;
    this.dividers = this.total - 1;
  }

}
