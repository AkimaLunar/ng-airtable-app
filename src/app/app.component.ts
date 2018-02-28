import { Component, OnInit } from '@angular/core';

import { HorizonService } from './services/horizon.service';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs/Observable';
import { Question } from './quiz/question/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  quizList;
  constructor ( private dataService: DataService, private horizon: HorizonService) {}
  ngOnInit() {
    this.quizList = this.dataService.getQuizList();
  }
}
