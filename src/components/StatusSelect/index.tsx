import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState, type TodoStatus, toggleStatusFilter } from '../../store'
import { useCallback } from 'react';

const statusConfig: { value: TodoStatus; label: string, color: "primary" | "warning" | "success" }[] = [
  { value: 'todo', label: 'TODO', color: 'primary' },
  { value: 'in-progress', label: 'In Progress', color: 'warning' },
  { value: 'done', label: 'Done', color: 'success' },
]

export function StatusSelect() {
  const dispatch = useDispatch()
  const selectedStatuses = useSelector((state: RootState) => state.todos.selectedStatuses)

  const handleStatusToggle = useCallback((_event: React.MouseEvent<HTMLElement>, newStatuses: TodoStatus[]) => {
    // Находим разницу между текущим и новым состоянием
    const statusToToggle = statusConfig.find(
      (config) =>
        (selectedStatuses.includes(config.value) && !newStatuses.includes(config.value)) ||
        (!selectedStatuses.includes(config.value) && newStatuses.includes(config.value))
    )

    if (statusToToggle) {
      dispatch(toggleStatusFilter(statusToToggle.value))
    }
  }, [dispatch, selectedStatuses])

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        Показать колонки:
      </Typography>
      <ToggleButtonGroup
        value={selectedStatuses}
        onChange={handleStatusToggle}
        aria-label="выбор статусов"
      >
        {statusConfig.map((status) => (
          <ToggleButton
            key={status.value}
            value={status.value}
            aria-label={status.label}
            color={status.color}
          >
            {status.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}
