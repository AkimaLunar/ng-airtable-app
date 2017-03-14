import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';

import { Question } from '../quiz/question/question';

// Temporary data
import { TESTDATA } from '../mock-test-data';


@Injectable()
export class DataService {
  // private dataUrl = 'https://raw.githubusercontent.com/AkimaLunar/ng-airtable-app/restructure/src/app/mock-test-data.json';
  private dataUrl = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/Quiz%20Two?api_key=keyRdgQxtBeMi3ASe';
  private airtableUrl = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/';
  private airtableKey = 'https://api.airtable.com/v0/apppdxgm3hmrZWDwE/Quiz%20Two?api_key=keyRdgQxtBeMi3ASe';
  private airtableBase = 'Quiz%20Two';

  // private airtableBases = ['Quiz%20Two', 'Quiz%20One'];

  private extractData(res: Response) {
    let data = res.json();
    let quiz = [];
    data.records.forEach(element => {
      let question: any = new Object;
      question.text = element.fields['Text'];
      question.options = element.fields['Options'].split(', ');
      question.answer = element.fields['CorrectAnswer'];
      quiz.push(question);
    });
    return quiz;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
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

  constructor(private http: Http){}

  getQuizes() {
    return this.http.get(this.dataUrl)
      .map(this.extractData)
      //.map(res => res.json())
      .catch(this.handleError);
  }

  getNumber() {
    return this.http.get(this.dataUrl).count().catch(this.handleError);
  }

  getQuiz(id: number) {
    // let quizUrl = this.airtableUrl + this.airtableBases[id] + '?' + this.airtableKey;
    let quizUrl = this.airtableUrl + this.airtableBase + '?' + this.airtableKey;
    return this.http.get(quizUrl)
      // .map(this.extractData)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getQuestions(): Question[] {
    return TESTDATA;
  }
}
