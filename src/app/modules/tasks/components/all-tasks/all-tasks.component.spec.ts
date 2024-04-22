import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksComponent } from './all-tasks.component';

describe('AllTasksComponent', () => {
  let component: AllTasksComponent;
  let fixture: ComponentFixture<AllTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTasksComponent]
    });
    fixture = TestBed.createComponent(AllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
