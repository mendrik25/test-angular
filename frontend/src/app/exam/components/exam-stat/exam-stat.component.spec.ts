import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStatComponent } from './exam-stat.component';

describe('ExamStatComponent', () => {
  let component: ExamStatComponent;
  let fixture: ComponentFixture<ExamStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
