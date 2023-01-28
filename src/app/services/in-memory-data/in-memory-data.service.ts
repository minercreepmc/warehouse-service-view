import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      products: [
        { id: 1, name: 'Apple', quantity: 15 },
        { id: 2, name: 'Banana', quantity: 0 },
      ],
    };
  }
}
