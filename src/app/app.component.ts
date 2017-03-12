import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string;
  quizes;
  mode = 'Observable';
  constructor (private dataService: DataService) {}
  ngOnInit() { this.getQuizes(); }

  getQuizes() {
    this.dataService.getQuizes()
                     .subscribe(
                       quizes => this.quizes = quizes,
                       error =>  this.errorMessage = <any>error);
  }

}
