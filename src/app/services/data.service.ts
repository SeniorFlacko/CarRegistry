import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Car } from '../shared/models/car.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  cars: Car[] = [
    {
      vehicleType: 'CAR',
      model: 'MAZDA CX-5',
      color: 'red',
      licenceNumber: '7979DASA',
      ownerName: 'John Doe',
      capacity: 'n/a',
    },
    {
      vehicleType: 'TRUCK',
      model: 'VOLVO AGT-M',
      color: 'white',
      licenceNumber: 'DAJHDA889',
      ownerName: 'Peter Jo',
      capacity: '1500lbs',
    },
  ];

  constructor() {}

  getCars(basic: boolean) {
    if (basic) {
      const carsBasicView = JSON.parse(JSON.stringify(this.cars));

      carsBasicView.map((car: any) => {
        delete car.ownerName, delete car.capacity;
        return {
          ...car,
        };
      });
      return of([...carsBasicView]);
    }
    return of([...this.cars]);
  }

  addCar(car: Car) {
    const carToAdd: Car = {
      capacity: car.capacity,
      color: car.color,
      licenceNumber: car.licenceNumber,
      model: car.model,
      ownerName: car.ownerName,
      vehicleType: car.vehicleType,
    };
    this.cars = [...this.cars, carToAdd];
    return of(this.cars);
  }
}
