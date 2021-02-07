import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private vehicles$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor() { }

  setVehicles(data) {
    this.vehicles$.next(data)
  }

  getVehicles() {
    return this.vehicles$.asObservable();
  }

}
