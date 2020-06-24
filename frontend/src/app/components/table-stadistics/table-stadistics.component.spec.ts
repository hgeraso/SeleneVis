import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStadisticsComponent } from './table-stadistics.component';

describe('TableStadisticsComponent', () => {
  let component: TableStadisticsComponent;
  let fixture: ComponentFixture<TableStadisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableStadisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStadisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
