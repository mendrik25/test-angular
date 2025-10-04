import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DialogData, Exam, ExamStatus } from '../../interfaces/exam.interface';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ExamFormComponent } from '../exam-form/exam-form.component';

@Component({
  selector: 'app-exam-list',
  imports: [NgFor, NgClass, NgIf, MatDialogModule, DatePipe],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.scss',
})
export class ExamListComponent {
  matDialog = inject(MatDialog);
  exams = input<Exam[]>([]);
  formData = input<DialogData>({ examData: null, students: [] });
  saveExam = output<Exam>();
  status = ExamStatus;

  incomingExams = computed(() => {
    return this.exams().filter(
      (exam) =>
        new Date(exam.examDate) >= new Date() &&
        exam.status !== ExamStatus.CANCELED
    ).length;
  });

  openExamForm(data?: Exam | null) {
    if (data?._id) {
      this.formData().examData = data;
    }
    const dialogRef = this.matDialog.open(ExamFormComponent, {
      width: '800px',
      data: this.formData(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.formData().examData = null;
      if (result) {
        this.saveExam.emit(result);
      }
    });
  }
}
