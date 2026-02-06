import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { type Todo } from '../../store'
import { useTextEdit } from './useTextEdit'

interface TodoTextEditorProps {
  todo: Todo
}

export function TodoTextEditor({ todo }: TodoTextEditorProps) {
  const {
    isEditing,
    editText,
    setEditText,
    handleSave,
    handleCancel,
    handleDelete,
    startEditing,
  } = useTextEdit(todo)

  if (isEditing) {
    return (
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
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
      <Typography sx={{ flex: 1, wordBreak: 'break-word' }}>{todo.text}</Typography>
      <Stack direction="row">
        <IconButton size="small" onClick={startEditing} title="Редактировать">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleDelete} title="Удалить">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  )
}
