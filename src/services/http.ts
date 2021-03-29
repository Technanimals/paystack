import axios from 'axios';
export interface HttpClient {
  get<R>(input: GetInput): Promise<R>;
  post<T, R>(input: PostInput<T>): Promise<R>;
  makeRequest<T, R>(input: HttpRequest<T>): Promise<R>;
}

export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
}

export interface HttpRequest<T> {
  url: string;
  method: RequestMethod;
  data?: T;
  headers?: Record<string, string | number>;
}
export interface RequestInput {
  url: string;
  headers?: Record<string, string | number>;
}
export interface GetInput extends RequestInput {
  params?: Record<string, string | number>;
}
export interface PostInput<T> extends RequestInput {
  data: T;
}

export const defaultHttpClient: HttpClient = {
  get: async (input: GetInput) =>
    axios({
      method: 'GET',
      ...input,
    }).then(({ data }) => data),
  post: async <T>(input: PostInput<T>) =>
    axios({
      method: 'POST',
      ...input,
    }).then(({ data }) => data),
  makeRequest: async <T>(input: HttpRequest<T>) =>
    axios(input).then(({ data }) => data),
};
