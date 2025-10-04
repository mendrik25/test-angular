import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRootComponent } from './exam-root.component';

describe('ExamRootComponent', () => {
  let component: ExamRootComponent;
  let fixture: ComponentFixture<ExamRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
