import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisLibrosComponent } from './mis-libros.component';

describe('MisLibrosComponent', () => {
  let component: MisLibrosComponent;
  let fixture: ComponentFixture<MisLibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisLibrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
