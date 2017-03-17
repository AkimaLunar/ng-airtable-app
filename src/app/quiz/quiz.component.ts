import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ProgressService } from '../services/progress.service';
import { Question } from './question/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  id: number;
  quiz: any;
  questions: Question[];
  questionsTotal: number;
  currentQuestion: Question;
  correctAnswers: number;
  final: boolean;

  mode = 'Observable';

  constructor(
    private dataService: DataService,
    public progressService: ProgressService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.id = this.route.params('id');
    this.route.data
      .subscribe((data) => {
        this.quiz = data;
        this.questions = this.quiz.quiz;
        this.currentQuestion = this.quiz.quiz[this.progressService.counter];
        this.questionsTotal = this.quiz.quiz.length;
      },
        function (err) {
          console.log('Error: ' + err);
        },
        function () {
          console.log('Completed');
        }
      );
    console.log('setting up the rest of the state');
    this.final = false;
    this.correctAnswers = 0;
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
