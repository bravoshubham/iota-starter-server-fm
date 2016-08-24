import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Counts } from './counts';

import * as _ from 'underscore';

@Injectable()
export class NumberOfCarsService {
  constructor() {  }

  getNumberOfCars(region: any, interval = 10): Observable<Counts>{
    var debugKey = Math.floor(Math.random()*100);
    return Observable.interval(interval * 1000)
      .map(x => {
        sampleData.all ++;
        return _.extend({_region: region}, sampleData);
      })
      .startWith(loadingData)
      .do(counts => console.log('getNumberOfCars(%s) item: %s', debugKey, counts.all));
  }
}

const loadingData: Counts = {
  _region: undefined,
  all: -1,
  troubled: -1,
  critical: -1,
};

const sampleData: Counts = {
  _region: undefined,
  all: 25,
  troubled: 10,
  critical: 2,
};
