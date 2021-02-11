import {Component, OnInit} from '@angular/core';
import {GeekTrustService} from '../../services/geek-trust.service';
import {DataService} from '../../services/data.service';
import {Planet} from './../interfaces/geekTrust';
import {SnotifyService} from 'ng-snotify';
import {Router} from '@angular/router';
import {PlanetVehicleContainer} from '../models/planet-vehicle-block';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  selectedPlanetsValues = [];
  selectedVehicleValues = [];
  planets: Planet[] = [];
  noOfDestinations = Array.from(Array(4).keys());
  timeTaken = 0;
  disabledBtn = true;
  destinations = null;

  constructor(
    private geekTrustService: GeekTrustService,
    private dataService: DataService,
    private snotifyService: SnotifyService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initializePlanetAndVehicleBlocks();
    this.subscribeToBlocks();
    this.geekTrustService.requestDataFromMultipleSources()
      .subscribe(responseList => {
        this.planets = responseList[0];
        this.dataService.setPlanets(responseList[0]);
        this.dataService.setVehicles(responseList[1]);
        this.dataService.setToken(responseList[2].token);
      }, (err) => {
        console.log('error', err);
      });
  }

  initializePlanetAndVehicleBlocks() {
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
    this.dataService.setSelectedPlanetAndVehicle(data);
    this.subscribeToCalculateTime();
  }

  subscribeToBlocks() {
    this.dataService.getSelectedPlanetAndVehicle()
      .subscribe(response => {
        this.destinations = response;
      });
  }

  subscribeToCalculateTime() {
    this.dataService.getSelectedPlanetAndVehicle()
      .subscribe(response => {
        console.log('calculateTime', response);
        this.timeTaken = 0;
        response.forEach(value => {
          this.calculateTime(value);
        });
      });
  }

  calculateTime(value) {
    if (value.planetDistance && value.vehicleSpeed) {
      this.timeTaken = this.timeTaken + (value.planetDistance / value.vehicleSpeed);
    }
  }

  findFalcone() {
    const planets = [];
    const vehicles = [];
    this.selectedPlanetsValues.forEach(value => {
      planets.push(value.name);
    });
    this.selectedVehicleValues.forEach(value => {
      vehicles.push(value.name);
    });
    this.geekTrustService.findFalcone({planet_names: planets, vehicle_names: vehicles, token: this.dataService.getToken()})
      .subscribe(result => {
        this.dataService.setResult(result);
        this.router.navigate(['result']);
      }, (err) => {
        // @ts-ignore
        this.snotifyService.error(err.error.error, 'Error', {position: 'rightTop'});
      });
  }

}
