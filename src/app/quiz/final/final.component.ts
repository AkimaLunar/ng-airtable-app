import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../question/question';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent {
  @Input() questions: Question[];
  @Input() questionsTotal: number;
  @Input() correctAnswers: number;

  @Output() onReset = new EventEmitter<any>();

  constructor() { }

  startOver() {
    this.onReset.emit();
  }

}
