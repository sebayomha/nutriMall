import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-container',
  templateUrl: './sales-container.component.html',
  styleUrls: ['./sales-container.component.css']
})
export class SalesContainerComponent implements OnInit {

  action;

  constructor() { }

  ngOnInit() {
    this.action = 'nuevaVenta';
  }

  selectedTab($event) {
    ($event.index === 0) ? this.action = 'nuevaVenta' : this.action = 'todaySales';
  }

}
