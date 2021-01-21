import { TestBed } from '@angular/core/testing';

import { MostrarLibrosService } from './mostrar-libros.service';

describe('MostrarLibrosService', () => {
  let service: MostrarLibrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarLibrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
