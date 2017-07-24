import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database'
import { environment } from '../../environments/environment';

import { Car } from '../models';

@Injectable()
export class CarsService {
  private readonly dbUrl = environment.firebase.databaseURL;
  private carToShare = new Subject<any>();
  carToShare$ = this.carToShare.asObservable();

  constructor(private http: Http, private afd: AngularFireDatabase) { }

  getCars(): Observable<any> {
    return this.afd.list('/cars');
  }
  addCar(car: Car): Observable<any> {
    return this.http.post(this.dbUrl + '/cars.json', car);
  }
  deleteCar(car) {

    let driverKeys = car.drivers;
    let carKey = car.$key;

    this.http.delete(this.dbUrl + '/cars/' + carKey + '.json').subscribe(() => {
      let tasks$ = [];
      for (var key in driverKeys) {
        if (driverKeys.hasOwnProperty(key)) {
          tasks$.push(this.http.delete(this.dbUrl + '/drivers/' + key + '/cars/' + carKey + '.json'));
        }
      }
      Observable.forkJoin(tasks$).subscribe(() => this.carToShare.next(null));
    });
  }
  updateCar(carKey, car): Observable<any> {
    return this.http.patch(this.dbUrl + '/cars/' + carKey + '.json', car);
  }
  addDriver(car, driverKey) {
    let carKey = car.$key;
    let updateCars = {};
    let updateDrivers = {};

    updateCars[carKey] = true;
    updateDrivers[driverKey] = true;

    this.http.patch(this.dbUrl + '/drivers/' + driverKey + '/cars.json', updateCars).subscribe(() =>
      this.http.patch(this.dbUrl + '/cars/' + carKey + '/drivers.json', updateDrivers).subscribe(() => {
        let newCar = car;
        (!newCar.drivers) && (newCar.drivers = {});
        newCar.drivers[driverKey] = true;
        this.carToShare.next(newCar);
      }));
  }
  deleteDriver(car, driverKey) {
    let carKey = car.$key;

    this.http.delete(this.dbUrl + '/drivers/' + driverKey + '/cars/' + carKey + '.json').subscribe(() =>
      this.http.delete(this.dbUrl + '/cars/' + carKey + '/drivers/' + driverKey + '.json').subscribe(() => {
        let newCar = car;
        delete newCar.drivers[driverKey];
        this.carToShare.next(newCar)
      }));
  }
  shareCar(car) {
    return this.carToShare.next(car);
  }
}
