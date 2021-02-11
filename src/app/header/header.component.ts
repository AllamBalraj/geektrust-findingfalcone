import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
  }

  reset() {
    this.dataService.setDefaultValues();
    this.dataService.resetVehicleStock(true);
  }

}
