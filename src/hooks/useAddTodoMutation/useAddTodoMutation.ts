import { useMutation } from 'react-query'

import { API_HOST } from '../../lib/constants'
import Todo from '../../models/todo'

type AddingTodo = Pick<Todo, 'todo' | 'completed' | 'userId'>

const useAddTodoMutation = () => {
  const mutation = useMutation('todos', async (params: AddingTodo) => {
    const response = await fetch(`${API_HOST}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return (await response.json()) as Todo
  })

  return mutation
}

export default useAddTodoMutation
