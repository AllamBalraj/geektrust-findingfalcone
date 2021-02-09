import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Vehicle} from '../app/interfaces/geekTrust';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private vehicles$: BehaviorSubject<Vehicle[]> = new BehaviorSubject([]);
  private token$: BehaviorSubject<string> = new BehaviorSubject(null);
  private result$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
  }

  setToken(data) {
    this.token$.next(data);
  }

  getToken() {
    return this.token$.getValue();
  }

  setVehicles(data) {
    this.vehicles$.next(data);
  }

  getVehicles() {
    return this.vehicles$.asObservable();
  }

  setResult(data) {
    this.result$.next(data);
  }

  getResult() {
    return this.result$.asObservable();
  }

}
