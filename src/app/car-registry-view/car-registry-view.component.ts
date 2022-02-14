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
  ELEMENT_DATA_SOURCE: Car[] = [];
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
