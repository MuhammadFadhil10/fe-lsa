export interface Pages {
  label: string;
  path: string;
}

export type ExamQuestion = {
  _id: string;
  question: string;
  answerKey: string;
  score: number;
};

export type Participan = {
  _id: string;
  studentId: string;
  examToken: string;
  answer: string[];
};

export interface Exam {
  _id: string;
  teacherId: string;
  studentIds: string[];
  subject: string;
  duration: string;
  examToken: string;
  questions: ExamQuestion[];
  endTime: Date;
  participants: Participan[];
}
