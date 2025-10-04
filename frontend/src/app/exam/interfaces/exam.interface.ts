import { Student } from './student.interface';

export interface Exam {
  _id: any;
  student: Student;
  examPlace: string;
  examDate: string;
  examTime: string;
  status: ExamStatus;
}

export enum ExamStatus {
  CONFIRMED = 'Confirmé',
  TO_ORGANIZE = 'À organiser',
  CANCELED = 'Annulé',
  SEARCHING_PLACE = 'En recherche de place',
}

export interface ExamStatistics {
  confirmedExams: number;
  examsToOrganize: number;
  canceledExams: number;
  examsSearchingPlace: number;
}

export interface DialogData {
  examData: Exam | null;
  students: Student[];
}
