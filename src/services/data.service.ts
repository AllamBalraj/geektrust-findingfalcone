import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Planet, SelectedPlanetAndVehicle, Vehicle} from '../app/interfaces/geekTrust';
import {PlanetVehicleContainer} from '../app/models/planet-vehicle-block';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private vehicles$: BehaviorSubject<Vehicle[]> = new BehaviorSubject([]);
  private planets$: BehaviorSubject<Planet[]> = new BehaviorSubject([]);
  private token$: BehaviorSubject<string> = new BehaviorSubject(null);
  private result$: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedPlanetAndVehicle$: BehaviorSubject<SelectedPlanetAndVehicle[]> = new BehaviorSubject<SelectedPlanetAndVehicle[]>([]);
  private timeTaken: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private defaultVehicleStock = null;

  constructor() {
  }

  setDefaultValues() {
    const data = [];
    for (let i = 1; i <= 4; i++) {
      const obj = new PlanetVehicleContainer();
      obj.id = i;
      obj.planet = null;
      obj.vehicle = null;
      obj.planetDistance = null;
      obj.vehicleSpeed = null;
      data.push(obj);
    }
    this.setSelectedPlanetAndVehicle(data);
  }

  setToken(data) {
    this.token$.next(data);
  }

  getToken() {
    return this.token$.getValue();
  }

  setPlanets(data) {
    this.planets$.next(data);
  }

  getPlanets() {
    return this.planets$.asObservable();
  }

  setVehicles(data) {
    this.vehicles$.next(data);
  }

  getVehicles() {
    return this.vehicles$.asObservable();
  }

  resetVehicleStock(reset, vehicleStock?) {
    if (reset) {
      this.setVehicles(this.defaultVehicleStock);
    } else {
      this.defaultVehicleStock = JSON.parse(JSON.stringify(vehicleStock));
    }
  }

  setSelectedPlanetAndVehicle(data) {
    this.selectedPlanetAndVehicle$.next(data);
  }

  getSelectedPlanetAndVehicle() {
    return this.selectedPlanetAndVehicle$.asObservable();
  }

  setPlanetAtIndex(index, planetName, planetDistance) {
    const data = this.selectedPlanetAndVehicle$.getValue();
    const i = data.findIndex(o => o.id === index);
    data[i].planet = planetName;
    data[i].planetDistance = planetDistance;
    if (data[i].vehicle) { // reset vehicle if planet is changed
      this.setVehicleStock(data[i].vehicle, true);
      data[i].vehicle = null;
      data[i].vehicleSpeed = null;
    }
    this.setSelectedPlanetAndVehicle(data);
  }

  setVehicleAtIndex(index, vehicleName, vehicleSpeed) {
    const data = this.selectedPlanetAndVehicle$.getValue();
    const i = data.findIndex(o => o.id === index);
    if (data[i].vehicle !== null) {
      this.setVehicleStock(data[i].vehicle, true);
    }
    data[i].vehicle = vehicleName;
    data[i].vehicleSpeed = vehicleSpeed;
    this.setVehicleStock(vehicleName);
    this.setSelectedPlanetAndVehicle(data);
  }

  setVehicleStock(vehicleName, incrementValue = false) {
    const data = this.vehicles$.getValue();
    const i = data.findIndex(o => o.name === vehicleName);
    if (incrementValue) {
      data[i].total_no = data[i].total_no + 1;
    } else {
      data[i].total_no = data[i].total_no - 1;
    }
    this.setVehicles(data);
  }

  setTimeTaken(data) {
    this.timeTaken.next(data);
  }

  getTimeTaken() {
    return this.timeTaken.asObservable();
  }

}
