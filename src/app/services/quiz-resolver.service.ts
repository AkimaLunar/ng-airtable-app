import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Question } from '../quiz/question/question';
import { DataService } from './data.service';

@Injectable()
export class QuizResolverService implements Resolve<Question[]> {

  constructor(
    private dataService: DataService,
    private router: Router
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Question[]> {
    const id = route.params['id'];
    // const id = 0;
    return this.dataService.getQuiz(id).then(quiz => {
      if (quiz) {
        return quiz;
      } else { // id not found
        console.log('FAILED TO LOAD DATA');
        this.router.navigate(['/']);
        return null;
      }
    });
  }

}
