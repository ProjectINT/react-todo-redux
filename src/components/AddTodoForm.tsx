import { useState, type SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { addTodo } from '../store'

export function AddTodoForm() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text.trim()))
      setText('')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 1.5 }}
    >
      <TextField
        size="small"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
        
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
      >
        Добавить
      </Button>
    </Box>
  )
}
