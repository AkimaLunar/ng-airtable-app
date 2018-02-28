import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { Params, ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { ProgressService } from "../services/progress.service";
import { Question } from "./question/question";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  quizId: string;

  quiz: any;
  questions: Question[];
  questionsTotal: number;
  currentQuestion: Question;
  correctAnswers: number;
  final: boolean;
  mode = "Observable";

  constructor(
    private dataService: DataService,
    public progressService: ProgressService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.stateReset();
        this.quiz = data;
        this.quizId = "IdWillGoHere";
        this.questions = this.quiz.quiz;
        this.currentQuestion = this.quiz.quiz[this.progressService.counter];
        this.questionsTotal = this.quiz.quiz.length;
        this.progressService.setTotal(this.questionsTotal);
      },
      function(err) {
        console.log("Error: " + err);
      },
      function() {
        console.log("Completed");
      }
    );
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
    }
    this.progressService.increment();

    if (this.progressService.counter < this.questionsTotal) {
      this.next();
    } else {
      this.saveScore(
        this.authService.userProfile["user_id"],
        this.quizId,
        this.correctAnswers
      );
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
    console.log(`ID: ${id} TEST: ${testId} SCORE: ${score}`);
    // New DB integration goes here
  }
}
