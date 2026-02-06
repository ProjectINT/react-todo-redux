import { Card, CardContent } from '@mui/material'
import { type Todo } from '../../store'
import { TodoItemControls } from './TodoItemControls'
import { TodoTextEditor } from './TodoTextEditor'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <TodoTextEditor todo={todo} />
        <TodoItemControls todoId={todo.id} status={todo.status} />
      </CardContent>
    </Card>
  )
}
