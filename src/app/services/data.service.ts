import { Injectable } from '@angular/core';

import { Question } from './question/question';
import { TESTDATA } from '../mock-test-data';

@Injectable()
export class DataService {
  getQuestions(): Question[] {
    return TESTDATA;
  }

  getQuestion(i: number): Question {
    return TESTDATA[i];
  }
}
