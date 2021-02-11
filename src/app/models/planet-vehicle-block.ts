import {SelectedPlanet, SelectedVehicle} from '../interfaces/geekTrust';

export class PlanetVehicleContainer {
  id: number;
  planet: SelectedPlanet;
  vehicle: SelectedVehicle;
  planetDistance: number;
  vehicleSpeed: number;
}
