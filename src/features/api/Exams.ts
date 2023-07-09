import { Api } from ".";
import { Exam } from "..";

export class Exams {
  static async getExams() {
    return await Api.get("/student/exams");
  }

  static async getTeacherExams() {
    return await Api.get("/teacher/exams");
  }

  static async createExam(body: Partial<Exam>) {
    return await Api.post("/teacher/exams", body);
  }

  // progress
  static async startExams(examToken: string, examId: string) {
    return await Api.post(`/exam/${examId}/start`, { examToken });
  }

  static async submitExam(answers: string[], examId: string) {
    return await Api.post(`/exam/${examId}/submit`, { answers });
  }

  static async evaluateExam(examId: string, studentId: string) {
    return await Api.post(`/teacher/exams/${examId}/evaluate/${studentId}`);
  }
}
