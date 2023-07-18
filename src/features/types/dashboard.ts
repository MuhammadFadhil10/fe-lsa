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
  answers: string[];
  score?: number;
};

export interface Exam {
  _id: string;
  teacherId: string;
  studentIds: string[];
  subject: string;
  duration: string;
  thumbnailPath: string;
  examToken: string;
  questions: ExamQuestion[];
  endTime: Date;
  participants: Participan[];
}

export interface ExamResult {
  subject: string;
  score: number | null;
  detail: {
    question: string;
    answer: string;
  }[];
}

export interface AnswerBody {
  questionId: string;
  answer: string;
}

// data table
export interface ColumnDataTable {
  title: string;
  width?: number | "half";
  cell: (currentIndex: number) => JSX.Element[] | JSX.Element;
  onClick?: () => void;
}
