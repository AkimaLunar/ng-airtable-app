import { Injectable } from '@angular/core';
const Horizon = require('@horizon/client');

@Injectable()
export class HorizonService {

  public horizon: any;
  status: {} | Boolean = false;

  connect() {
    this.horizon = Horizon({ host: '127.0.0.1:8181'});
    return new Promise((resolve, reject) => {
      this.horizon.onReady((status) => {
        this.status = status;
        resolve(status);
      });
      this.horizon.connect();
    });
  }
}
