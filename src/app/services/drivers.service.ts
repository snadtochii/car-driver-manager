import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database'
import { environment } from '../../environments/environment';

import { Driver } from '../models';

@Injectable()
export class DriversService {

  private readonly dbUrl = environment.firebase.databaseURL;
  private driverToShare = new Subject<any>();
  driverToShare$ = this.driverToShare.asObservable();

  constructor(private http: Http, private afd: AngularFireDatabase) { }

  getDrivers() {
    return this.afd.list('/drivers');
  }
  addDriver(driver) {
    return this.http.post(this.dbUrl + '/drivers.json', driver);
  }
  deleteDriver(driver) {
    let carKeys = driver.cars;
    let driverKey = driver.$key;

    return this.http.delete(this.dbUrl + '/drivers/' + driverKey + '.json').subscribe(() => {
      let tasks$ = [];
      for (var key in carKeys) {
        if (carKeys.hasOwnProperty(key)) {
          tasks$.push(this.http.delete(this.dbUrl + '/cars/' + key + '/drivers/' + driverKey + '.json'));
        }
      }
      Observable.forkJoin(tasks$).subscribe(() => this.driverToShare.next(null));
    });
  }

  updateDriver(driverKey, driver) {
    return this.http.patch(this.dbUrl + '/drivers/' + driverKey + '.json', driver);
  }

  addCar(driver, carKey) {
    let driverKey = driver.$key;
    let updateDrivers = {};
    let updateCars = {};

    updateDrivers[driverKey] = true;
    updateCars[carKey] = true;

    this.http.patch(this.dbUrl + '/drivers/' + driverKey + '/cars.json', updateCars).subscribe(() =>
      this.http.patch(this.dbUrl + '/cars/' + carKey + '/drivers.json', updateDrivers).subscribe(() => {
        let newDriver = driver;
        (!newDriver.cars) && (newDriver.cars = {});

        newDriver.cars[carKey] = true;
        this.driverToShare.next(newDriver);
      }));
  }
  deleteCar(driver, carKey) {
    let driverKey = driver.$key;

    this.http.delete(this.dbUrl + '/drivers/' + driverKey + '/cars/' + carKey + '.json').subscribe(() =>
      this.http.delete(this.dbUrl + '/cars/' + carKey + '/drivers/' + driverKey + '.json').subscribe(() => {
        let newDriver = driver;
        delete newDriver.cars[carKey];
        this.driverToShare.next(newDriver)
      }));
  }
  shareDriver(driver) {
    return this.driverToShare.next(driver)
  }
}
