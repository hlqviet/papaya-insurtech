import { useQuery, UseQueryOptions } from 'react-query'

import { ApiGetResponse } from '../../lib/common'
import { API_HOST } from '../../lib/constants'
import User from '../../models/user'

interface UseGetUsersQueryProps {
  options?: UseQueryOptions<ApiGetResponse<'users', User>, Error>
}

const useGetUsersQuery = (props: UseGetUsersQueryProps) => {
  const { options } = props
  const result = useQuery<ApiGetResponse<'users', User>, Error>(
    'users',
    async () => {
      const response = await fetch(`${API_HOST}/users?limit=0`)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return (await response.json()) as ApiGetResponse<'users', User>
    },
    { ...options }
  )

  return result
}

export default useGetUsersQuery
