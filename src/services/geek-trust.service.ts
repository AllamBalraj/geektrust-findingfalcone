import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeekTrustService {

  private baseUrl = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getToken() {
    return this.httpClient.post(this.baseUrl + '/token', {}, this.httpOptions);
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
    const token = this.getToken();
    return forkJoin([planets, vehicles, token]);
  }

  findFalcone(data) {
    return this.httpClient.post(this.baseUrl + '/find', data, this.httpOptions);
  }

}
