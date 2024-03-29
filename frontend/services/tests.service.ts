import axios from "axios";
import type {IAnswers} from "@/interfaces/answers.interface";
import type {ITestResult} from "@/interfaces/testResult.interface";

class TestsService {
  private URL = process.env.NEXT_PUBLIC_API_URL + '/tests'

  async sendResults(lesson_id: string, answers: IAnswers, initData?: string) {
    const resultList: number[][] = Object.values(answers);
    return await axios.post<ITestResult>(`${this.URL}/${lesson_id}/complete`,
        {
          'answers': resultList
        },
        {
          headers: {
            "X-Telegram-Init-Data": initData
          }
        });
  }
}

export default new TestsService()