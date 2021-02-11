import {Component, Input, Output, OnChanges, EventEmitter, OnInit} from '@angular/core';
import {Vehicle, Planet} from '../interfaces/geekTrust';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnChanges, OnInit {

  @Input() items = [];
  @Input() allSelectedPlanets = [];
  @Input() allSelectedVehicles = [];
  @Input() destinationId;
  @Output() planetChange = new EventEmitter();
  @Output() vehicleChange = new EventEmitter();
  selectedPlanet = null;
  selectedVehicle = null;
  planets: Planet[] = [];
  vehicles: Vehicle[] = [];

  /****/
  @Input() destination;
  selectedPlanetsAndVehicles = [];

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnChanges() {
    this.planets = this.items.filter(value => {
      // if planet is selected in current destination then return it
      if (this.selectedPlanet && this.selectedPlanet.name === value.name) {
        return value;
      }
      //if planet is not selected in any destination then return it
      if (this.isPlanetSelected(value.name) === -1) {
        return value;
      }
    });
  }

  ngOnInit() {
    this.dataService.getVehicles()
      .subscribe((response: Vehicle[]) => {
        this.vehicles = response;
      });
  }

  onChange($event) {
    if (this.selectedPlanet) { // if selected planet is changed then remove the previous planet from object
      const index = this.isPlanetSelected(this.selectedPlanet.name);
      this.allSelectedPlanets.splice(index, 1);
    }
    this.selectedPlanet = $event;
    this.allSelectedPlanets.push($event); // push newly selected planet to all-selected-planets object
    this.planetChange.emit(this.allSelectedPlanets);
    if (this.selectedVehicle) { // if vehicle is already selected and planet is changed, then planet distance should also change
      const index = this.allSelectedVehicles.findIndex(v => v.name === this.selectedVehicle.name);
      this.allSelectedVehicles[index].planetDistance = this.selectedPlanet.distance;
      this.vehicleChange.emit(this.allSelectedVehicles);
    }
  }

  isPlanetSelected(planetName) {
    return this.allSelectedPlanets.findIndex(o => o.name === planetName);
  }

  setVehicleCount(vehicleName, incrementNumber = false) {
    const index = this.vehicles.findIndex(v => v.name === vehicleName);
    incrementNumber ? this.vehicles[index].total_no++ : this.vehicles[index].total_no--;
  }

  onChangeVehicle(vehicle) {
    if (this.selectedVehicle) {// if selected vehicle is changed then remove the previous vehicle from object
      this.setVehicleCount(this.selectedVehicle.name, true);
      const index = this.allSelectedVehicles.findIndex(v => v.name === this.selectedVehicle.name);
      this.allSelectedVehicles.splice(index, 1);
    }
    this.setVehicleCount(vehicle.name); //calculate available rockets
    this.dataService.setVehicles(this.vehicles); //set available rockets after selecting the vehicle
    this.selectedVehicle = Object.assign({}, vehicle); // for copying value, not reference
    this.selectedVehicle.planetDistance = this.selectedPlanet.distance;
    this.allSelectedVehicles.push(this.selectedVehicle); // push newly selected vehicle to all-selected-vehicles object
    this.vehicleChange.emit(this.allSelectedVehicles);
  }

  checkDisabled(vehicle) {
    if (this.selectedPlanet && this.selectedPlanet.distance > vehicle.max_distance) {
      return true;
    }
    if (!this.selectedVehicle && vehicle.total_no === 0) {
      return true;
    } else {
      if (this.selectedVehicle && this.selectedVehicle.name !== vehicle.name && vehicle.total_no === 0) {
        return true;
      }
    }
  }

  getPlanetImage(planetName) {
    return 'assets/images/' + planetName.toLowerCase() + '.png';
  }

}
