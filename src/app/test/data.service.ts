import { Injectable } from '@angular/core';

import { Question } from './question/question';
import { TESTDATA } from '../mock-test-data';

@Injectable()
export class DataService {
  getQuestions(): Promise<Question[]> {
    return Promise.resolve(TESTDATA);
  }

  getQuestion(i:number): Promise<Question> {
    return this.getQuestions()
    .then(questions => questions[i]);
  }
}