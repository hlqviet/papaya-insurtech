import { useQuery, UseQueryOptions } from 'react-query'

import { ApiGetResponse } from '../../lib/common'
import { API_HOST, PER_PAGE } from '../../lib/constants'
import Todo from '../../models/todo'

interface UseGetTodosQueryProps {
  page?: number
  perPage?: number
  userId: number
  options?: UseQueryOptions<ApiGetResponse<'todos', Todo>, Error>
}

const useGetTodosQuery = (props: UseGetTodosQueryProps) => {
  const { page = 0, perPage = PER_PAGE, userId, options } = props
  const result = useQuery<ApiGetResponse<'todos', Todo>, Error>(
    ['todos', page, perPage, userId],
    async () => {
      const searchParams = new URLSearchParams()

      searchParams.set('limit', `${perPage}`)
      searchParams.set('skip', `${page * perPage}`)

      const response = await fetch(
        `${API_HOST}/todos/user/${userId}?${searchParams.toString()}`
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return (await response.json()) as ApiGetResponse<'todos', Todo>
    },
    { keepPreviousData: true, ...options }
  )

  return result
}

export default useGetTodosQuery
