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
  isEvaluated?: boolean;
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
  isEvaluated?: boolean;
}

export interface AnswerBody {
  questionId: string;
  answer: string;
  accuracy?: number;
}

// data table
export interface ColumnDataTable {
  title: string;
  titleJustify?: "start" | "center";
  bodyJustify?: "start" | "center";
  bodyAlign?: "start" | "center";
  width?: number;
  fixed?: boolean;
  cell: (currentIndex: number) => JSX.Element[] | JSX.Element;
  onClick?: (currentIndex: number) => void;
}
