import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';
import { Observable } from 'rxjs/Observable';
import { Question } from './quiz/question/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mode = 'Observable';
  id = 0;
  currentQuiz: Question[];
  constructor ( private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getQuiz2(this.id).subscribe((response => this.currentQuiz = response),
      function(){
        console.log('Promise: I failed :(!');
      }
    );
  }
}
