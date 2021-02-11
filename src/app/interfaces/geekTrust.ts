export interface Planet {
  name: string;
  distance: number;
}

export interface Vehicle {
  name: string;
  total_no: number;
  max_distance: number;
  speed: number;
  planetDistance?: number;
}

export interface SelectedPlanet {
  id: number;
  name: string;
}

export interface SelectedVehicle {
  id: number;
  name: string;
}

export interface SelectedPlanetAndVehicle {
  id: number;
  planet: string;
  vehicle: string;
  planetDistance: number;
  vehicleSpeed: number;
}
