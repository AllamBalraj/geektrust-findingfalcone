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

  selectedPlanetsValues = [];
  selectedVehicleValues = [];
  planets: Planet[] = [];
  noOfDestinations = Array.from(Array(4).keys());
  timeTaken = 0;
  disabledBtn = true;

  constructor(
    private geekTrustService: GeekTrustService,
    private dataService: DataService,
    private snotifyService: SnotifyService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.geekTrustService.requestDataFromMultipleSources()
      .subscribe(responseList => {
        this.planets = responseList[0];
        this.dataService.setVehicles(responseList[1]);
        this.dataService.setToken(responseList[2].token);
      }, (err) => {
        console.log('error', err);
      });
  }

  selectedPlanets($event) {
    this.selectedPlanetsValues = [...$event];
    this.checkBtnStatus();
  }

  selectedVehicles($event) {
    this.selectedVehicleValues = [...$event];
    this.checkBtnStatus();
    this.calculateTime();
  }

  checkBtnStatus() {
    if (this.selectedPlanetsValues.length === 4 && this.selectedVehicleValues.length === 4) {
      this.disabledBtn = false;
    } else {
      this.disabledBtn = true;
    }
  }

  calculateTime() {
    this.timeTaken = 0;
    this.selectedVehicleValues.forEach(value => {
      this.timeTaken = this.timeTaken + (value.planetDistance / value.speed);
    });
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
    this.geekTrustService.findFalcone({'planet_names': planets, 'vehicle_names': vehicles, 'token': this.dataService.getToken()})
      .subscribe(result => {
        this.dataService.setResult(result);
        this.router.navigate(['result']);;
      }, (err) => {
        // @ts-ignore
        this.snotifyService.error(err.error.error, 'Error', {position: 'rightTop'});
      });
  }

}
