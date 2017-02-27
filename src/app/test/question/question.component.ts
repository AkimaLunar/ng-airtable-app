import { Component, OnInit } from '@angular/core';
import { Question } from './question'
import { DataService } from '../data.service';

@Component({
  selector: 'quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  questionsTotal: number;
  currentQuestion: Question;
  progress: number;
  correctAnswers: number;
  final: boolean;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.dataService.getQuestions()
    //   .then(questions => this.questions = questions);
    // this.currentQuestion = this.questions[0];
    this.progress = 0;
    this.final = false;
    this.correctAnswers = 0;
    this.questions= [
      {text: "Question 1?", options: ["one", "two", "three"], answer:"two"},
      {text: "Question 2?", options: ["one", "two", "three"], answer:"two"},
      {text: "Question 3?", options: ["one", "two", "three"], answer:"two"},
      {text: "Question 4?", options: ["one", "two", "three"], answer:"two"}
    ];
    this.currentQuestion = this.questions[this.progress];
    this.questionsTotal = this.questions.length;
    console.log(this.progress);
  }

  next(): void {
    if (this.progress < this.questionsTotal) {
      console.log('Progress: ' + this.progress);
      this.currentQuestion = this.questions[this.progress];
    }
  }

  results(): void {
    this.final = true;
  }

  check(guess: string): void {
    console.log(guess === this.currentQuestion.answer);
    if (guess === this.currentQuestion.answer) {
      this.correctAnswers++;
    };
    console.log('Correct answers: ' + this.correctAnswers);
    this.progress++;

    if (this.progress < this.questionsTotal) {
      console.log('final? ' + this.final);
      this.next();
    } else {
      console.log('final? ' + this.final);
      this.results();
    }
  }

  startOver(): void {
    this.progress = 0;
    this.correctAnswers = 0;
    this.final = false;
    this.currentQuestion = this.questions[0];
  }
}