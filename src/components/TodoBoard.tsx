import { Box, Container, Grid, Typography } from '@mui/material'
import { AddTodoForm } from './AddTodoForm'
import { TodoColumn } from './TodoColumn'

export function TodoBoard() {
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
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TodoColumn
            status="todo"
            title="TODO"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TodoColumn
            status="in-progress"
            title="In Progress"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TodoColumn
            status="done"
            title="Done"
          />
        </Grid>
      </Grid>
    </Container>
  )
}
