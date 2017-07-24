import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';

import { Car, CarOptions } from '../../models';

import { CarsService } from '../../services';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  private readonly brands = CarOptions.BRANDS;
  private readonly colors = CarOptions.COLORS;
  private readonly bodyTypes = CarOptions.BODYTYPES;
  private readonly locations = CarOptions.LOCATIONS;
  private models;
  private model;
  modalActions = new EventEmitter<string | MaterializeAction>();

  @Input()
  car: Car;

  constructor(private carService: CarsService) { }

  ngOnInit() { }

  changeModels(brand) {
    this.models = this.brands.find(el => el.name == brand).models;
  }
  saveCar(form: NgForm, key?) {
    if (this.car) {
      this.carService.updateCar(key, form.value).subscribe(console.log);
    }
    else {
      this.carService.addCar(form.value).subscribe(console.log);
    }
  }


  deleteCar(car) {
    this.carService.deleteCar(car);
    this.car = undefined;
    this.closeModal();
  }
  openModal(form?: NgForm, car?: Car) {
    this.car = undefined;
    if (car) {
      this.car = car;
      this.changeModels(this.car.brand);
      this.models.slice();
    } else if (form) {
      form.resetForm();
    }
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}
