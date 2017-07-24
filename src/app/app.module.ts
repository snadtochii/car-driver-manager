import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CarsService, DriversService } from './services';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    CarsListComponent,
    DriversListComponent,
    DriverDetailsComponent,
    NavbarComponent,
    HomeComponent,
    CarDetailsComponent,
    AddCarComponent,
    AddDriverComponent,
    DriversListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes)
  ],
  providers: [CarsService, DriversService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
