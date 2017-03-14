import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataService } from '../services/data.service';
import { ProgressService } from '../services/progress.service';
import { Question } from './question/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizes;
  errorMessage: string;
  questions: any;

  // Because it's an Observable and breaks the code
  questions2: any ;
  test: any;
  // ------------------------

  questionsTotal: number;
  currentQuestion: Question;
  correctAnswers: number;
  final: boolean;

  mode = 'Observable';

  constructor(
    private dataService: DataService,
    public progressService: ProgressService
  ) { }
  getQuestions() {
    this.dataService.getQuizes()
      .subscribe(

        // Because it's an Observable and breaks the code
        questions => this.questions2 = questions,
        // ------------------------

        error => this.errorMessage = <any>error);
  }
  ngOnInit() {
    this.getQuestions();
    this.final = false;
    this.correctAnswers = 0;

    // Because it's an Observable and breaks the code
    this.questions = this.dataService.getQuestions();
    // ------------------------

    this.currentQuestion = this.questions[this.progressService.counter];
    this.questionsTotal = this.questions.length;
  }
  next(): void {
    if (this.progressService.counter < this.questionsTotal) {
      this.currentQuestion = this.questions[this.progressService.counter];
    }
  }

  results(): void {
    this.final = true;
  }

  onGuess(guess: boolean): void {
    if (guess === true) {
      this.correctAnswers++;
    };
    this.progressService.increment();

    if (this.progressService.counter < this.questionsTotal) {
      this.next();
    } else {
      this.results();

    }
  }

  onReset(): void {
    this.progressService.reset();
    this.correctAnswers = 0;
    this.final = false;
    this.currentQuestion = this.questions[0];
  }
}
