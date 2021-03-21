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
  body?: T;
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
  body: T;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const defaultHttpClient: HttpClient = {};
