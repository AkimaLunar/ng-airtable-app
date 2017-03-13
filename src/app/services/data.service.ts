import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Question } from '../quiz/question/question';

// Temporary data
import { TESTDATA } from '../mock-test-data';


@Injectable()
export class DataService {
  private dataUrl = 'https://raw.githubusercontent.com/AkimaLunar/ng-airtable-app/restructure/src/app/mock-test-data.json';

  private extractData(res: Response) {
    let body = res.json();
    return body["770 Oak"] || "NOPE";
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
      // .map(res => res.json())
      .catch(this.handleError);
  }

  getQuiz(i: number) {

  }

  getQuestions(): Question[] {
    return TESTDATA;
  }
}
