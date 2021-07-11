import axios, { AxiosInstance } from "axios";

class StackExchangeClient {
  axiosInstance?: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.stackexchange.com/2.3",
    });
  }

  async getRecentQuestions(): Promise<Question[]> {
    const request = {
      url: "search/advanced",
      params: {
        accepted: true,
        answers: 2,
        pageSize: 10,
        filter: "withbody",
        sort: "creation",
        order: "desc",
        site: "stackoverflow",
      },
    };
    const response = await this.axiosInstance?.request(request);
    return response?.data?.items ?? [];
  }

  async getAnswersForQuestion(questionId: number): Promise<Answer[]> {
    const request = {
      url: `questions/${questionId}/answers`,
      params: {
        page: 1,
        filter: "withbody",
        site: "stackoverflow",
      },
    };
    const answers: Answer[] = [];
    let hasMore = true;
    while (hasMore) {
      const response = await this.axiosInstance?.request(request);
      const results = response?.data?.items;
      if (results?.length) {
        answers.push(...results);
      }
      hasMore = response?.data?.has_more ?? false;
      request.params.page++;
    }
    return answers.sort(() => Math.random() - 0.5);
  }
}

interface Question {
  question_id: number;
  title: string;
  body: string;
}

interface Answer {
  answer_id: number;
  body: string;
  is_accepted: boolean;
}

const client = new StackExchangeClient();

export { Question, Answer };
export default client;
