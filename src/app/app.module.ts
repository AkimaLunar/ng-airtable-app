import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { Routing } from './app.routes';
import { QuizResolverService } from './services/quiz-resolver.service';
import { DataService } from './services/data.service';

import { HeaderModule } from './header/header.module';
import { QuizModule } from './quiz/quiz.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeaderboardComponent,
  ],
  imports: [
    Routing,
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HeaderModule,
    QuizModule
  ],
  providers: [DataService, QuizResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
