import { Component, OnInit } from '@angular/core';

import { ProgressService } from '../progress.service';


@Component({
  selector: 'quiz-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  constructor(public progressService: ProgressService) { }

  ngOnInit() {
  }

}
