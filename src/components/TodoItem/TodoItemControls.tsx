import { useDispatch } from 'react-redux'
import { Button, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { toggleStatus, type TodoStatus } from '../../store'

interface TodoItemControlsProps {
  todoId: string
  status: TodoStatus
}

export function TodoItemControls({ todoId, status }: TodoItemControlsProps) {
  const dispatch = useDispatch()

  const handleStatusChange = (newStatus: TodoStatus) => {
    dispatch(toggleStatus({ id: todoId, status: newStatus }))
  }

  return (
    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
      {status !== 'todo' && (
        <Button size="small" variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => handleStatusChange('todo')}>
          TODO
        </Button>
      )}
      {status !== 'in-progress' && (
        <Button
          size="small"
          variant="outlined"
          startIcon={status === 'done' ? <ArrowBackIcon /> : undefined}
          endIcon={status === 'todo' ? <ArrowForwardIcon /> : undefined}
          onClick={() => handleStatusChange('in-progress')}
        >
          In Progress
        </Button>
      )}
      {status !== 'done' && (
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
  )
}
