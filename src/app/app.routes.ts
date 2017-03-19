import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { QuizResolverService } from './services/quiz-resolver.service';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';

// Adding the AuthGuard service
import { AuthGuard } from './services/auth-guard.service';

const routes = [
    {path: '', component: HomeComponent},
    {path: 'leaderboard', component: LeaderboardComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {
        path: 'quiz/:id',
        component: QuizComponent,
        resolve: {
            quiz: QuizResolverService
        }
    }
];

export const Routing = RouterModule.forRoot(routes);
