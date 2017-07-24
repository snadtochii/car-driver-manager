import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../services';

import { Driver } from '../../models';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent implements OnInit {

  drivers: Driver[];
  driversFiltered: Driver[];
  selectedDriver: Driver;

  constructor(private driversService: DriversService) { }

  ngOnInit() {
    this.driversService.getDrivers().subscribe((drivers) => { this.drivers = this.driversFiltered = drivers });
    this.driversService.driverToShare$.subscribe(driver => this.selectedDriver = driver)
  }
  filterDrivers(search: string) {
    this.driversFiltered = this.drivers.filter((el) => {
      let fullName = (el.lastName + ' ' + el.firstName + ' ' + el.fathersName).trim().toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
  }
  shareDriver(driver) {
    this.driversService.shareDriver(driver);
  }
}
