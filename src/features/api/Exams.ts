import { Api } from ".";

export class Exams {
  static async getExams() {
    return await Api.get("/student/exams");
  }

  static async startExams(examToken: string) {
    return await Api.post("/exam/start", { examToken });
  }
}
