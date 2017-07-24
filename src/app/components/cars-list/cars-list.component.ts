import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Car } from '../../models';

import { CarsService } from '../../services';
@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  cars: Car[];
  carsFiltered: Car[];
  selectedCar: Car;

  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.carsService.getCars().subscribe((cars) => { this.cars = this.carsFiltered = cars });
    this.carsService.carToShare$.subscribe(car => this.selectedCar = car)
  }
  filterCars(search: string) {
    this.carsFiltered = this.cars.filter((el) => {
      let carName = (el.brand + ' ' + el.model).trim().toLowerCase();
      return carName.includes(search.toLowerCase());
    });
  }
  shareCar(car) {
    this.carsService.shareCar(car);
  }
}
