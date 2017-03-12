import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { DataService } from '../services/data.service';
import { ProgressService } from '../services/progress.service';

import { QuizComponent } from './quiz.component';
import { QuestionComponent } from './question/question.component';
import { ProgressComponent } from '../shared/progress/progress.component';
import { FinalComponent } from './final/final.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [QuizComponent, QuestionComponent, ProgressComponent, FinalComponent],
  exports: [QuizComponent],
  providers: [DataService, ProgressService]
})
export class QuizModule { }
