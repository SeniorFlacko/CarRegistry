import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { getCars } from '../actions/car.actions';
import { CarState } from '../reducers/car.reducers';
import { Car } from '../shared/models/car.model';

export interface PeriodicElement {
  name?: string;
  position?: number;
  weight?: number;
  symbol?: string;
}

const BACKUP_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const TDATA: Car[] = [
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

@Component({
  selector: 'app-car-registry-view',
  templateUrl: './car-registry-view.component.html',
  styleUrls: ['./car-registry-view.component.scss'],
})
export class CarRegistryViewComponent implements OnInit {
  displayedColumns: string[] = [
    'vehicleType',
    'model',
    'color',
    'licenceNumber',
    'ownerName',
    'capacity',
  ];
  columnsToDisplay: string[] = [
    'vehicleType',
    'model',
    'color',
    'licenceNumber',
  ];
  ELEMENT_DATA_SOURCE = this.getBasicViewData().slice();
  dataSource = new MatTableDataSource(this.ELEMENT_DATA_SOURCE);
  view: string = 'basic-view';

  destroy$: Subject<boolean> = new Subject<boolean>();

  car$ = this.store.select('cars');

  constructor(private store: Store<CarState>) {}

  ngOnInit(): void {
    this.getAllCars();

    this.car$.pipe(takeUntil(this.destroy$)).subscribe((cars) => {
      if (this.view === 'basic-view') {
        this.columnsToDisplay = [
          'vehicleType',
          'model',
          'color',
          'licenceNumber',
        ];
        this.ELEMENT_DATA_SOURCE = [...cars];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_SOURCE);
      } else {
        this.ELEMENT_DATA_SOURCE = [...cars];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_SOURCE);
        this.columnsToDisplay = this.displayedColumns.slice();
      }
    });
  }

  getAllCars() {
    this.store.dispatch(getCars({ basic: true }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  renderBasicView() {
    this.columnsToDisplay = ['vehicleType', 'model', 'color', 'licenceNumber'];
    this.ELEMENT_DATA_SOURCE = this.getBasicViewData().slice();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_SOURCE);
  }

  renderExtendedView() {
    this.ELEMENT_DATA_SOURCE = this.getExtendedViewData().slice();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_SOURCE);
    this.columnsToDisplay = this.displayedColumns.slice();
  }

  getBasicViewData(): Car[] {
    return [
      {
        vehicleType: 'CAR',
        model: 'MAZDA CX-5',
        color: 'red',
        licenceNumber: '7979DASA',
      },
      {
        vehicleType: 'TRUCK',
        model: 'VOLVO AGT-M',
        color: 'white',
        licenceNumber: 'DAJHDA889',
      },
    ];
  }

  getExtendedViewData(): Car[] {
    return [
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
  }

  onSelect($event: any) {
    if ($event.value === 'basic-view') {
      this.store.dispatch(getCars({ basic: true }));
    } else {
      this.store.dispatch(getCars({ basic: false }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
