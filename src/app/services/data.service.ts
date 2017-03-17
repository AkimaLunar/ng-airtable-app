import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Question } from '../quiz/question/question';

@Injectable()
export class DataService {
  // private dataUrl = 'https://raw.githubusercontent.com/AkimaLunar/ng-airtable-app/restructure/src/app/mock-test-data.json';
  // private dataUrl = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/Cat%20Questions?api_key=keyRdgQxtBeMi3ASe';
  private airtableUrl = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/';
  private airtableKey = 'api_key=keyRdgQxtBeMi3ASe';
  private airtableBases = ['Cat%20Questions', 'Movie%20Questions'];

  private extractData(response) {
    const data = response.json();
    const quiz = [];
    data.records.forEach(element => {
      const question = {
        text: String,
        options: Array,
        answer: String
       };
      question.text = element.fields['Text'] ? element.fields['Text'] : '';
      question.options = element.fields['Options'] ? element.fields['Options'].split(', ') : [''];
      question.answer = element.fields['CorrectAnswer'] ? element.fields['CorrectAnswer'] : '';
      quiz.push(question);
    });
    return quiz;
  }

  private handleError (error: any) {
    // In a real world app, use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {}
  getQuizList() {
    const quizes = [];
    this.airtableBases.forEach((element, index) => {
      const title = decodeURI(element);
      quizes.push({id: index, name: title});

    });
    return quizes;
  }
  getQuiz(id: number): Promise<Question[]> {
    const quizUrl = this.airtableUrl + this.airtableBases[id] + '?' + this.airtableKey;
    // const quizUrl = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/Cat%20Questions?api_key=keyRdgQxtBeMi3ASe';
    console.log('Getting data');
    return this.http.get(quizUrl)
      // .map(res => res.json())
      .map(this.extractData)
      .catch(this.handleError)
      .toPromise();
  }

  getNumberOfQuestions(id: number): Promise<number> {
    const quizUrl = this.airtableUrl + this.airtableBases[0] + '?' + this.airtableKey;
    // const quizUrl = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/Cat%20Questions?api_key=keyRdgQxtBeMi3ASe';
    console.log('Getting the number of questions');
    return this.http.get(quizUrl)
    .map((res) => {
      const data = res.json();
      return data.records.length;
    })
    .catch(this.handleError)
    .toPromise();
  }
}
