import { Injectable } from '@angular/core';
const Horizon = require('@horizon/client');
// import * as Horizon from '@horizon/client';
// figure out why that's not working

@Injectable()
export class HorizonService {

  table = Horizon({host: 'localhost:8181'});

  // userFind$ = (userId) => this.table('user_scores').find(userId).fetch();

}


// const appointmentFind$ = (appointmentId) => hz('appointments').find(appointmentId).fetch();
// const stylistFind$ = (stylistId) => hz('stylists').find(stylistId).fetch();

// appointmentFind$(appointmentId)
//   .mergeMap((appointment) => stylistFind$(appointment.stylistId)
//     .map((stylist) => ({ ...appointment, stylist })))
//   .subscribe((x) => console.log(x));