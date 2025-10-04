import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Exam } from '../interfaces/exam.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private httpClient = inject(HttpClient);

  loadExams() {
    return this.httpClient.get(`${environment.apiUrl}/exams`);
  }

  loadStudents() {
    return this.httpClient.get(`${environment.apiUrl}/students`);
  }

  createOrUpdateExam(examData: Exam) {
    return !examData._id
      ? this.httpClient.post(`${environment.apiUrl}/exams`, examData)
      : this.httpClient.put(
          `${environment.apiUrl}/exams/${examData._id}`,
          examData
        );
  }
}
