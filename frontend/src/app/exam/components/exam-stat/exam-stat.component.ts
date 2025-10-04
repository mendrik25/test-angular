import { Component, input } from '@angular/core';
import { ExamStatistics } from '../../interfaces/exam.interface';

@Component({
  selector: 'app-exam-stat',
  imports: [],
  templateUrl: './exam-stat.component.html',
  styleUrl: './exam-stat.component.scss',
})
export class ExamStatComponent {
  examStats = input<ExamStatistics>({
    confirmedExams: 0,
    examsToOrganize: 0,
    canceledExams: 0,
    examsSearchingPlace: 0,
  });
}
