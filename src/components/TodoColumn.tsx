import { useSelector } from 'react-redux'
import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { type RootState, type TodoStatus } from '../store'
import { TodoItem } from './TodoItem/TodoItem'

interface TodoColumnProps {
  status: TodoStatus
  title: string
}

export function TodoColumn({ status, title }: TodoColumnProps) {
  const todos = useSelector((state: RootState) =>
    state.todos.items.filter((todo) => todo.status === status)
  )

  return (
    <Paper sx={{ p: 2.5, borderRadius: 3 }} elevation={1}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <Chip label={todos.length} size="small" />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1.5}>
        {todos.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }} item-prop="empty-state">
            Пусто
          </Typography>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </Stack>
    </Paper>
  )
}
