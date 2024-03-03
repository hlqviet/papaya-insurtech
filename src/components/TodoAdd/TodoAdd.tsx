import {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState
} from 'react'

import useAddTodoMutation from '../../hooks/useAddTodoMutation'
import useAuth from '../../hooks/useAuth/useAuth'
import Todo from '../../models/todo'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import TextField from '../TextField'

interface TodoAddProps {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

const TodoAdd = (props: TodoAddProps) => {
  const { setTodos } = props
  const [content, setContent] = useState('')
  const { mutateAsync: addTodo, isLoading } = useAddTodoMutation()
  const { user } = useAuth()

  const handleContentChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setContent(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!user) return

    addTodo({ todo: content, completed: false, userId: user.id })
      .then((todo) => {
        setTodos((prevState) => [...prevState, todo])
        setContent('')
      })
      .catch(console.error)
  }

  return (
    <div>
      <form className='w-full flex gap-2' onSubmit={handleSubmit}>
        <TextField value={content} onChange={handleContentChange} required />
        <ButtonPrimary disabled={isLoading} type='submit'>
          Submit
        </ButtonPrimary>
      </form>
    </div>
  )
}

export default TodoAdd
