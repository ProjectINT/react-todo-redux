import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Card, CardContent, IconButton, Stack, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { deleteTodo, toggleStatus, updateTodo, type Todo, type TodoStatus } from '../store'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleStatusChange = (newStatus: TodoStatus) => {
    dispatch(toggleStatus({ id: todo.id, status: newStatus }))
  }

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

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        {isEditing ? (
          <Stack spacing={1}>
            <TextField
              size="small"
              fullWidth
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
                if (e.key === 'Escape') handleCancel()
              }}
              autoFocus
            />
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="success" onClick={handleSave}>
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={handleCancel}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ flex: 1, wordBreak: 'break-word' }}>{todo.text}</Typography>
              <Stack direction="row">
                <IconButton size="small" onClick={() => setIsEditing(true)} title="Редактировать">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleDelete} title="Удалить">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {todo.status !== 'todo' && (
                <Button size="small" variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => handleStatusChange('todo')}>
                  TODO
                </Button>
              )}
              {todo.status !== 'in-progress' && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={todo.status === 'done' ? <ArrowBackIcon /> : undefined}
                  endIcon={todo.status === 'todo' ? <ArrowForwardIcon /> : undefined}
                  onClick={() => handleStatusChange('in-progress')}
                >
                  In Progress
                </Button>
              )}
              {todo.status !== 'done' && (
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleStatusChange('done')}
                >
                  Done
                </Button>
              )}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  )
}
