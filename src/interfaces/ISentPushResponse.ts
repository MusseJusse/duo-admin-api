export interface ISentPushResponse {
  response: Response;
  stat: string;
}

export interface Response {
  confirmation_code: string;
  push_id: string;
}
