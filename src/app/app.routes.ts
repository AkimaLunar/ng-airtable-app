import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuizComponent } from './quiz/quiz.component';
import {RouterModule} from '@angular/router';
const routes = [
    {path: '', component: HomeComponent},
    {path: 'leaderboard', component: LeaderboardComponent},
    {path: 'quiz/id', component: QuizComponent}
];


export default RouterModule.forRoot(routes);

// .forRoot(routes);
// .forChild(routes);