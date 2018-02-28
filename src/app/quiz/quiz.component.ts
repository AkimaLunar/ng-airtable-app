import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { HorizonService } from '../services/horizon.service';
import { DataService } from '../services/data.service';
import { ProgressService } from '../services/progress.service';
import { Question } from './question/question';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizId: string;

  quiz: any;
  questions: Question[];
  questionsTotal: number;
  currentQuestion: Question;
  correctAnswers: number;
  final: boolean;
  table = this.horizonService.table('user_scores');
  mode = 'Observable';

  constructor(
    private horizonService: HorizonService,
    private dataService: DataService,
    public progressService: ProgressService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.stateReset();
        this.quiz = data;
        this.quizId = 'IdWillGoHere'
        this.questions = this.quiz.quiz;
        this.currentQuestion = this.quiz.quiz[this.progressService.counter];
        this.questionsTotal = this.quiz.quiz.length;
        this.progressService.setTotal(this.questionsTotal);
      },
        function (err) {
          console.log('Error: ' + err);
        },
        function () {
          console.log('Completed');
        });
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
      this.saveScore(this.authService.userProfile['user_id'], this.quizId, this.correctAnswers);
      this.results();

    }
  }

  onReset(): void {
    this.stateReset();
    this.currentQuestion = this.questions[0];
  }
  stateReset(): void {
    this.progressService.reset();
    this.correctAnswers = 0;
    this.final = false;
  }

  saveScore(id: string, testId: string, score: number) {
    this.table.store({
      id: this.authService.userProfile['user_id'],
    });
    let changed = false;
    let temp: any = { };
    this.table.find(this.authService.userProfile['user_id']).fetch().toPromise().then((data) => {
      temp = data;
      if (!data.scores) {
        this.table.store({
          id: this.authService.userProfile['user_id'],
          scores: []
        });
        this.table.find(this.authService.userProfile['user_id']).fetch().toPromise().then(data => temp = data);
        console.log('Creating a user');
      }
      for (let i = 0; i < temp.scores.length; i++) {
        console.log(temp.scores[i]);
        if (temp.scores[i].id === testId) {
          changed = true;
          temp.scores[i].score = score;
          console.log('Updating score: ' + temp.scores[i].id);
        }
      }

      if (!changed) {
        temp.scores.push({
          id: testId,
          score: score,
          date: new Date()
        });
        console.log('New score');
      }

      this.table.store(temp);
    });
  }
}



// {
// "$hz_v$": 0 ,
// "id":  "012345" ,
// "name": "Best Writer",
// "scores": [
//     "id": "The Best Post!",
//       ",

//     "timestamp": "Thu Mar 23 2017 23:30:40 GMT-0700 (PDT)"
// ]
// }

// r.db('ng_airtable_horizon').table('user_scores').get('auth0|58cd94acbdaeed709e2d0481').update(function(user)
//   { return r.branch(user.hasFields('scores'),
//     { scores: user('scores').append({'test': 'cats', 'score': 3})},
//     { scores : [{'test': 'cats', 'score': 3}]}
// )})