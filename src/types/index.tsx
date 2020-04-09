export interface Question {
  title, A, B, C, D, answer, create_time?: string,
  qid, type?: number
}

export interface UserInfo {
  openid: string,
  avatarUrl: string,
  gender: number,
  nickname: string,
  token: string
}