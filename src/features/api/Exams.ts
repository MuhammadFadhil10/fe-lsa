import { Api } from ".";
import { Exam } from "..";

export class Exams {
  // read
  static async getExams() {
    return await Api.get("/student/exams");
  }

  static async getTeacherExams() {
    return await Api.get("/teacher/exams");
  }

  static async getExamResults() {
    return await Api.get("student/exam-results");
  }

  // write
  static async createExam(body: Partial<Exam>) {
    return await Api.post("/teacher/exams", body);
}

  static async startExams(examToken: string, examId: string) {
    return await Api.post(`/exam/${examId}/start`, { examToken });
  }

  static async submitExam(answers: string[], examId: string) {
    return await Api.post(`/exam/${examId}/submit`, { answers });
  }

  static async evaluateExam(examId: string, studentId: string, method: string) {
    try {
      return await Api.post(`/teacher/exams/${examId}/evaluate/${studentId}`, {
        method,
      });
    } catch (error: any) {
      console.log("evaluate exam err: ", error.message);
      throw Error(error.message);
    }
  }
}
