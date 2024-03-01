export type ApiResponse<K extends string, T> = { [P in K]: T[] } & {
  total: number
  skip: number
  limit: number
}
