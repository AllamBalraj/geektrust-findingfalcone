import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  @Input() destination;
  planets = [];
  availablePlanets = [];
  selectedPlanetsAndVehicles = [];

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.subscribeToPlanetAndVehicles();
    this.subscribeToPlanets();
    this.getSelectedPlanetAndVehicles();
  }

  subscribeToPlanetAndVehicles() {
    this.dataService.getSelectedPlanetAndVehicle()
      .subscribe(response => {
        if (response.length > 0) {
          const index = response.findIndex(o => o.id === this.destination.id);
          if (index > -1) {
            this.destination = response[index];
          }
        }
      });
  }

  subscribeToPlanets() {
    this.dataService.getPlanets()
      .subscribe(response => {
        this.planets = response;
        this.resetAvailablePlanets();
      });
  }

  onChange($event) {
    this.dataService.setPlanetAtIndex(this.destination.id, $event.name, $event.distance);
  }

  getSelectedPlanetAndVehicles() {
    this.dataService.getSelectedPlanetAndVehicle()
      .subscribe(response => {
        this.selectedPlanetsAndVehicles = response;
        this.resetAvailablePlanets();
      });
  }

  resetAvailablePlanets() {
    this.availablePlanets = this.planets.filter(value => {
      // if planet is selected in current destination then return it
      if (this.destination.planet && this.destination.planet === value.name) {
        return value;
      }
      // if planet is not selected in any destination then return it
      if (this.isPlanetSelected(value.name) === -1) {
        return value;
      }
    });
  }

  isPlanetSelected(planetName) {
    return this.selectedPlanetsAndVehicles.findIndex(o => o.planet === planetName);
  }

  getPlanetImage(planetName) {
    return 'assets/images/' + planetName.toLowerCase() + '.png';
  }


}
