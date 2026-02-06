import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo, type Todo } from '../../store'

export function useTextEdit(todo: Todo) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: todo.id, text: editText.trim() }))
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  const startEditing = () => setIsEditing(true)

  return {
    isEditing,
    editText,
    setEditText,
    handleSave,
    handleCancel,
    handleDelete,
    startEditing,
  }
}