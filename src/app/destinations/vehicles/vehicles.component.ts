import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  @Input() destination;
  vehicles = [];

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.subscribeToPlanetAndVehicles();
    this.subscribeToVehicles();
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

  subscribeToVehicles() {
    this.dataService.getVehicles()
      .subscribe(response => {
        this.vehicles = response;
      });
  }

  onChangeVehicle($event) {
    this.dataService.setVehicleAtIndex(this.destination.id, $event.name, $event.speed);
  }

  checkDisabled(vehicle) {
    if (this.destination.planetDistance && this.destination.planetDistance > vehicle.max_distance) {
      return true;
    }
    if (!this.destination.vehicle && vehicle.total_no === 0) {
      return true;
    } else {
      if (this.destination.vehicle && this.destination.vehicle !== vehicle.name && vehicle.total_no === 0) {
        return true;
      }
    }
  }

}
