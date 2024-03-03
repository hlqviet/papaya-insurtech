import { useEffect, useState } from 'react'

import useAuth from '../../hooks/useAuth/useAuth'
import useGetTodosQuery from '../../hooks/useGetTodosQuery'
import Todo from '../../models/todo'
import Spinner from '../Spinner'
import TodoAdd from '../TodoAdd'
import TodoItem from './components/TodoItem'

const TodoList = () => {
  const { user } = useAuth()
  const { error, data, isLoading } = useGetTodosQuery({
    userId: user?.id || 0,
    options: { enabled: !!user }
  })
  // Mutations are simulated so intermediate data is necessary
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    if (!data || !data.todos.length) {
      setTodos([])
      return
    }

    setTodos(data.todos)
  }, [data])

  if (error) return <p>Something wrong happened: {error.message}</p>

  if (isLoading) return <Spinner />

  if (!data) return null

  const filteredTodos = todos.filter(({ isDeleted }) => !isDeleted)

  return (
    <div className='flex flex-col gap-2'>
      <TodoAdd setTodos={setTodos} />

      {!filteredTodos.length && <p>You don&apos;t have any todo now.</p>}

      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  )
}

export default TodoList
