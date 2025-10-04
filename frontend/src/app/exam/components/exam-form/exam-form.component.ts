import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, Exam, ExamStatus } from '../../interfaces/exam.interface';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-exam-form',
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.scss',
})
export class ExamFormComponent implements OnInit {
  examForm!: FormGroup;
  status = ExamStatus;

  formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ExamFormComponent>);
  public data = inject(MAT_DIALOG_DATA) as DialogData;

  ngOnInit(): void {
    this.examForm = this.initForm();
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      _id: [this.data.examData?._id ?? null],
      student: [this.data.examData?.student._id ?? '', Validators.required],
      examPlace: [this.data.examData?.examPlace ?? ''],
      examDate: [
        this.formatDate(this.data.examData?.examDate!) ?? null,
        Validators.required,
      ],
      examTime: [this.data.examData?.examTime ?? '', Validators.required],
      status: [this.data.examData?.status ?? '', Validators.required],
    });
  }

  submitForm() {
    this.examForm.markAllAsTouched();
    if (this.examForm.valid) {
      this.dialogRef.close(this.examForm.value);
    }
  }

  formatDate(date: Date | string): string | null {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return date ? `${d.getFullYear()}-${month}-${day}` : null;
  }
}
