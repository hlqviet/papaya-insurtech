import {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  MouseEventHandler,
  SetStateAction,
  useState
} from 'react'

import Todo from '../../../../models/todo'
import ButtonBase from '../../../Buttons/ButtonBase'
import TextField from '../../../TextField'

interface TodoItemProps {
  todo: Todo
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

const TodoItem = (props: TodoItemProps) => {
  const {
    todo: { id, todo, completed },
    setTodos
  } = props
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(todo)

  const handleEditClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsEditing(true)
  }

  const handleContentChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setContent(event.target.value)
  }

  const handleContentKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      setTodos((prevState) =>
        prevState.map((todo) =>
          todo.id === id ? { ...todo, todo: content } : todo
        )
      )
    }

    if (event.key === 'Escape') {
      setIsEditing(false)
      setContent(todo)
    }
  }

  const handleMarkAsDoneClick: MouseEventHandler<HTMLButtonElement> = () => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    )
  }

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = () => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isDeleted: true } : todo
      )
    )
  }

  return (
    <div className='flex justify-between items-center gap-6 px-8 py-2 text-left bg-slate-100 hover:bg-slate-300 transition-all'>
      {isEditing && (
        <TextField
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleContentKeyDown}
          autoFocus
        />
      )}
      {!isEditing && (
        <>
          <span className={`${completed && 'line-through'}`}>{todo}</span>
          <div className='flex gap-2'>
            {!completed && (
              <ButtonBase
                className='btn-sm'
                title='Mark as done'
                onClick={handleMarkAsDoneClick}
              >
                ✔️
              </ButtonBase>
            )}
            {!completed && (
              <ButtonBase
                className='btn-sm'
                title='Edit'
                onClick={handleEditClick}
              >
                🖊️
              </ButtonBase>
            )}
            <ButtonBase
              className='btn-sm'
              title='Delete'
              onClick={handleDeleteClick}
            >
              ❌
            </ButtonBase>
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem
