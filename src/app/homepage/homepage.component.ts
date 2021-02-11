import {Component, OnInit} from '@angular/core';
import {GeekTrustService} from '../../services/geek-trust.service';
import {DataService} from '../../services/data.service';
import {Planet} from './../interfaces/geekTrust';
import {SnotifyService} from 'ng-snotify';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  planets: Planet[] = [];
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
        this.dataService.resetVehicleStock(false, responseList[1]);
      }, (err) => {
        // @ts-ignore
        this.snotifyService.error(err.message, 'Error', {position: 'rightTop'});
      });
  }

  initializePlanetAndVehicleBlocks() {
    this.dataService.setDefaultValues();
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
        this.timeTaken = 0;
        this.checkBtnStatus(response);
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

  checkBtnStatus(values) {
    const index = values.findIndex(v => v.vehicle === null);
    this.disabledBtn = index !== -1;
  }

  findFalcone() {
    this.dataService.setTimeTaken(this.timeTaken);
    this.router.navigate(['result']);
  }

}
