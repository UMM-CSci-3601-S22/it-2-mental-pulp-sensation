import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pantry } from '../app/pantry/pantry';
import { PantryService } from '../app/pantry/pantry.service';

/**
 * A "mock" version of the `PantryService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockPantryService extends PantryService {
  static testPantry: Pantry[] = [
    {
      _id: 'fried chicken_id',
      prodID: 'bruh',
      date: 'May 15, 2022',
      name: 'Chris'
    },
    {
      _id: '1',
      prodID: 'cap',
      date: 'May 15, 2022',
      name: 'Peanut'
    },
    {
      _id: '2',
      prodID: 'brim',
      date: 'May 15, 2022',
      name: 'pog'
    }
  ];

  constructor() {
    super(null);
  }

  getPantrys(filters: {
    prodID?: string;
    date?: string;
    name?: string;
  }): Observable<Pantry[]> {
    // Just return the test pantrys regardless of what filters are passed in
    return of(MockPantryService.testPantry);
  }

}
