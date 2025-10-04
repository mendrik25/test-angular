import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ExamStatComponent } from '../../components/exam-stat/exam-stat.component';
import { ExamListComponent } from '../../components/exam-list/exam-list.component';
import {
  DialogData,
  Exam,
  ExamStatistics,
  ExamStatus,
} from '../../interfaces/exam.interface';
import { ExamService } from '../../services/exam.service';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-exam-root',
  imports: [ExamStatComponent, ExamListComponent],
  templateUrl: './exam-root.component.html',
  styleUrl: './exam-root.component.scss',
})
export class ExamRootComponent implements OnInit {
  private examService = inject(ExamService);
  exams = signal<Exam[]>([]);
  formData = signal<DialogData>({ examData: null, students: [] });

  examStatistics = computed(() => {
    const stats = this.exams();
    return {
      confirmedExams: stats.filter((e) => e.status === ExamStatus.CONFIRMED)
        .length,
      examsToOrganize: stats.filter((e) => e.status === ExamStatus.TO_ORGANIZE)
        .length,
      canceledExams: stats.filter((e) => e.status === ExamStatus.CANCELED)
        .length,
      examsSearchingPlace: stats.filter(
        (e) => e.status === ExamStatus.SEARCHING_PLACE
      ).length,
    } as ExamStatistics;
  });

  ngOnInit(): void {
    this.examService.loadExams().subscribe((exams: any) => {
      this.exams.set(exams.data as Exam[]);
    });
    this.examService.loadStudents().subscribe((students: any) => {
      this.formData.set({
        examData: null,
        students: students.data as Student[],
      });
    });
  }

  handleSave(exam: Exam) {
    this.examService.createOrUpdateExam(exam).subscribe((savedExam: any) => {
      const currentExams = this.exams();

      !exam._id
        ? this.exams.set([...currentExams, savedExam.data as Exam])
        : this.exams.update((exams) =>
            exams.map((e) =>
              e._id === savedExam.data._id ? (savedExam.data as Exam) : e
            )
          );
    });
  }
}
