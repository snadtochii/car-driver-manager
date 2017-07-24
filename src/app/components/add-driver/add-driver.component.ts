import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';

import { DriversService } from '../../services';

import { Driver, DriverOptions } from '../../models';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();

  @Input()
  driver: Driver;

  constructor(private driversService: DriversService) { }

  ngOnInit() { }

  saveDriver(form: NgForm, key?) {
    let driver: Driver = form.value;
    driver.status = DriverOptions.STATUS[0];
    driver.accountBalance = 0;

    if (this.driver) {
      this.driversService.updateDriver(key, form.value).subscribe(console.log);
    }
    else {
      this.driversService.addDriver(driver).subscribe(console.log);
    }
  }

  deleteDriver(driver) {
    this.driversService.deleteDriver(driver);
    this.driver = undefined;
    this.closeModal();
  }

  openModal(form?: NgForm, driver?: Driver, ) {
    this.driver = undefined;
    if (driver) {
      this.driver = driver;
    } else if (form) {
      form.resetForm();
    }
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
}
