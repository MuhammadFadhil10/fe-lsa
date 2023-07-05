import { Api } from ".";
import { Exam } from "..";

export class Exams {
  static async getExams() {
    return await Api.get("/student/exams");
  }

  static async getTeacherExams() {
    return await Api.get("/teacher/exams");
  }

  static async startExams(examToken: string) {
    return await Api.post("/exam/start", { examToken });
  }

  static async createExam(body: Partial<Exam>) {
    return await Api.post("/teacher/exams", body);
  }
}
