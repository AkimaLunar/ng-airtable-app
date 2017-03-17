import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Question } from './question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent  {
  @Input() currentQuestion: Question;
  @Output() onGuess = new EventEmitter<boolean>();

  constructor() { }

  guess(guess: string) {
    if (guess === this.currentQuestion.answer) {
      this.onGuess.emit(true);
    } else {
      this.onGuess.emit(false);
    }
  }
}
