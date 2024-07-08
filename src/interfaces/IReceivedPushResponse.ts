export interface IReceivedPushResponse {
  response: Response;
  stat: string;
}

export interface Response {
  push_id: string;
  result: string;
}
