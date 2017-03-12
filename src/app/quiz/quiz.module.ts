import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ProgressService } from '../services/progress.service';
import { QuizComponent } from './quiz.component';
import { QuestionComponent } from './question/question.component';
import { ProgressComponent } from '../shared/progress/progress.component';
import { FinalComponent } from './final/final.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuizComponent, QuestionComponent, ProgressComponent, FinalComponent],
  exports: [QuizComponent],
  providers: [DataService, ProgressService]
})
export class QuizModule { }
