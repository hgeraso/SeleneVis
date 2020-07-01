import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursesStudentsComponent } from './list-courses-students.component';

describe('ListCoursesStudentsComponent', () => {
  let component: ListCoursesStudentsComponent;
  let fixture: ComponentFixture<ListCoursesStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoursesStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoursesStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
