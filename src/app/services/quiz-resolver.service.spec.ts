import { TestBed, inject } from '@angular/core/testing';

import { QuizResolverService } from './quiz-resolver.service';

describe('QuizResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizResolverService]
    });
  });

  it('should ...', inject([QuizResolverService], (service: QuizResolverService) => {
    expect(service).toBeTruthy();
  }));
});
