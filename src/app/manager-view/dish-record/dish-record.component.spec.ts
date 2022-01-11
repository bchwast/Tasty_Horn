import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishRecordComponent } from './dish-record.component';

describe('DishRecordComponent', () => {
  let component: DishRecordComponent;
  let fixture: ComponentFixture<DishRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
