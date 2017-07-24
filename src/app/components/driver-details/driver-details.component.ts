import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AddDriverComponent } from '../add-driver/add-driver.component';

import { DriversService, CarsService } from '../../services';
import { Driver } from '../../models';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  @Input()
  mod: any;

  driver: any;
  cars: any[];
  carsOfDriver: any[] = [];

  constructor(private driversService: DriversService, private carService: CarsService) { }

  ngOnInit() {
    this.carService.getCars().subscribe(cars => this.cars = cars);

    this.driversService.driverToShare$.subscribe(driver => {
      this.driver = driver;
      if (this.driver) {
        this.filterCars(this.driver.cars);
      }
    });
    this.carService.getCars().subscribe(cars => this.cars = cars);
  }

  deleteDriver(driver) {
    this.driversService.deleteDriver(driver)
    this.driver = undefined;
  }
  addCar(driver, carKey) {
    if (carKey) {
      this.driversService.addCar(driver, carKey);
    }
  }
  deleteCar(driver, carKey) {
    this.driversService.deleteCar(driver, carKey);
  }
  filterCars(cars) {
    this.carsOfDriver = [];
    if (this.driver.cars) {
      for (var carId in this.driver.cars) {
        if (this.driver.cars.hasOwnProperty(carId)) {
          this.cars.forEach((car) => {
            if (car.$key == carId) {
              this.carsOfDriver.push(car);
            }
          });
        }
      }
    }
  }
}
