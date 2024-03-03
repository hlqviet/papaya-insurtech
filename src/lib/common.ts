export type ApiGetResponse<K extends string, T> = { [P in K]: T[] } & {
  total: number
  skip: number
  limit: number
}
