
export type User = {
  id: number
  name: string
}

export interface Profile {
  id: number,
  name: string,
  token: string,
  age: number;
  country: string;
}

export interface Feedback {
  id: string,
  text: string,
  date: string,
  author: string,
}