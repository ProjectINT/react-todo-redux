import { Alert, Box, Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { type RootState, type TodoStatus } from '../store'
import { AddTodoForm } from './AddTodoForm'
import { StatusSelect } from './StatusSelect'
import { TodoColumn } from './TodoColumn'
import { useMemo } from 'react'

const columnConfig: { status: TodoStatus; title: string }[] = [
  { status: 'todo', title: 'TODO' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'done', title: 'Done' },
]

export function TodoBoard() {
  const selectedStatuses = useSelector((state: RootState) => state.todos.selectedStatuses)

  const actualConfig = useMemo(() => columnConfig.filter((column) => selectedStatuses.includes(column.status)), [selectedStatuses])

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          TODO List
        </Typography>
        <AddTodoForm />
      </Box>
      <StatusSelect />
      {selectedStatuses.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Все колонки скрыты. Выберите хотя бы один статус для отображения.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {actualConfig.map((column) => (
            <Grid key={column.status} size={{ xs: 12, md: 4 }}>
              <TodoColumn
                status={column.status}
                title={column.title}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
