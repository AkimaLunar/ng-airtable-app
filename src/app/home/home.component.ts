import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../quiz/question/question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizList;
  constructor ( private dataService: DataService) {}
  ngOnInit() {
    this.quizList = this.dataService.getQuizList();
  }

}
