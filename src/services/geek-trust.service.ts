import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Planet} from '../app/interfaces/geekTrust';

@Injectable({
  providedIn: 'root'
})
export class GeekTrustService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getToken() {
    return this.httpClient.post(this.baseUrl + '/token', {});
  }

  getPlanets() {
    return this.httpClient.get(this.baseUrl + '/planets');
  }

  geVehicles() {
    return this.httpClient.get(this.baseUrl + '/vehicles');
  }

  getResults(requestData) {
    return this.httpClient.post(this.baseUrl + '/find', requestData);
  }

  requestDataFromMultipleSources(): Observable<any[]> {
    const planets = this.getPlanets();
    const vehicles = this.geVehicles();
    return forkJoin([planets, vehicles]);
  }

  findFalcone(data) {
    return this.httpClient.post(this.baseUrl + '/find', data);
  }

}
