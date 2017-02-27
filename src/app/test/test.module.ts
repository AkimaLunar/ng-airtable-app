import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { DataService }        from './data.service';
import { QuestionComponent }  from './question/question.component';
import { ProgressComponent }  from './progress/progress.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuestionComponent, ProgressComponent],
  exports: [QuestionComponent, ProgressComponent],
  providers: [DataService]
})
export class TestModule { }
