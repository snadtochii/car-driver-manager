import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { CarsService, DriversService } from '../../services';
import { Car } from '../../models';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  @Input()
  mod: any;

  car: any;
  drivers: any[];
  driversOfCar: any[] = [];

  constructor(private carsService: CarsService, private driversSevice: DriversService) { }

  ngOnInit() {
    this.driversSevice.getDrivers().subscribe(drivers => this.drivers = drivers);
    this.carsService.carToShare$.subscribe(car => {
      this.car = car;
      if (this.car) {
        this.filterDrivers(this.car.drivers);
      }
    });
  }

  deleteCar(car) {
    this.carsService.deleteCar(car);
    this.car = undefined;
  }
  addDriver(car, driverKey) {
    if (driverKey) {
      this.carsService.addDriver(car, driverKey);
    }
  }
  deleteDriver(car, driverKey) {
    this.carsService.deleteDriver(car, driverKey);
  }
  filterDrivers(drivers) {
    this.driversOfCar = [];
    if (drivers) {
      for (var key in drivers) {
        if (drivers.hasOwnProperty(key)) {
          this.drivers.forEach((dr) => {
            if (dr.$key == key) {
              this.driversOfCar.push(dr);
            }
          });
        }
      }
    }
  }
}