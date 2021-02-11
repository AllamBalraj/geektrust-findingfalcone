import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {GeekTrustService} from '../../../services/geek-trust.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  timeTaken = null;
  results = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private geekTrustService: GeekTrustService
  ) {
  }

  ngOnInit() {
    this.subscribeToTimeTaken();
  }

  getResults() {
    const planets = [];
    const vehicles = [];
    const data = this.dataService.selectedPlanetAndVehicle$.getValue();
    data.forEach(value => {
      planets.push(value.planet);
      vehicles.push(value.vehicle);
    });
    this.geekTrustService.findFalcone({planet_names: planets, vehicle_names: vehicles, token: this.dataService.getToken()})
      .subscribe(result => {
        console.log('result', result);
        this.results = result;
      }, (err) => {
        // @ts-ignore
        this.snotifyService.error(err.error.error, 'Error', {position: 'rightTop'});
      });
  }

  subscribeToTimeTaken() {
    this.dataService.getTimeTaken()
      .subscribe(response => {
        if (response) {
          this.getResults();
          this.timeTaken = response;
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  goToHomepage() {
    this.router.navigate(['/']);
  }

  getPlanetUrl(planetName) {
    return 'assets/images/' + planetName.toLowerCase() + '.png';
  }

}
