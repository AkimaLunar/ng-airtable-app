import { Injectable } from '@angular/core';
import * as Horizon from '@horizon/client';

@Injectable()
export class HorizonService {

  table = Horizon({host: 'localhost:8181'});

}
