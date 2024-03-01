import { useQuery, UseQueryOptions } from 'react-query'

import { ApiResponse } from '../../lib/common'
import { API_HOST } from '../../lib/constants'
import User from '../../models/user'

interface UseGetUsersQueryProps {
  options?: UseQueryOptions<ApiResponse<'users', User>, Error>
}

const useGetUsersQuery = (props: UseGetUsersQueryProps) => {
  const { options } = props
  const query = useQuery<ApiResponse<'users', User>, Error>(
    'users',
    async () => {
      const response = await fetch(`${API_HOST}/users?limit=0`)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return (await response.json()) as ApiResponse<'users', User>
    },
    { ...options }
  )

  return query
}

export default useGetUsersQuery
