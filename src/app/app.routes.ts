import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { QuizResolverService } from './services/quiz-resolver.service';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuizComponent } from './quiz/quiz.component';
const routes = [
    {path: '', component: HomeComponent},
    {path: 'leaderboard', component: LeaderboardComponent},
    {
        path: 'quiz/id',
        component: QuizComponent,
        resolve: {
            quiz: QuizResolverService
        }
    }
];

export const Routing = RouterModule.forRoot(routes);

// .forRoot(routes);
// .forChild(routes);
