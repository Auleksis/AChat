export interface Token {
  access_token: string;
  token_type: string;
}

export interface Room {
  id: string;
  name: string;
  owner: string;
}

export interface User {
  username: string;
}
