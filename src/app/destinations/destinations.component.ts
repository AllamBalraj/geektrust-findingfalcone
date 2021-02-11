import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {

  @Input() destination;

  constructor() {
  }

  ngOnInit() {

  }

}
