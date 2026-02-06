import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TodoStatus = 'todo' | 'in-progress' | 'done'

export interface Todo {
  id: string
  text: string
  status: TodoStatus
  createdAt: number
  completedAt?: number
}

interface TodosState {
  items: Todo[]
  filter: TodoStatus | 'all'
  searchQuery: string
  selectedStatuses: TodoStatus[]
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  searchQuery: '',
  selectedStatuses: ['todo', 'in-progress', 'done'],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        status: 'todo',
        createdAt: Date.now(),
      }
      state.items.push(newTodo)
    },
    updateTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const todo = state.items.find((t) => t.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
      }
    },
    toggleStatus(state, action: PayloadAction<{ id: string; status: TodoStatus }>) {
      const todo = state.items.find((t) => t.id === action.payload.id)
      if (todo) {
        todo.status = action.payload.status
        if (action.payload.status === 'done') {
          todo.completedAt = Date.now()
        } else {
          delete todo.completedAt
        }
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
    setFilter(state, action: PayloadAction<TodoStatus | 'all'>) {
      state.filter = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    toggleStatusFilter(state, action: PayloadAction<TodoStatus>) {
      const status = action.payload
      const index = state.selectedStatuses.indexOf(status)
      if (index > -1) {
        state.selectedStatuses.splice(index, 1)
      } else {
        state.selectedStatuses.push(status)
      }
    },
  },
})

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
})

export const {
  addTodo,
  updateTodo,
  toggleStatus,
  deleteTodo,
  setFilter,
  setSearchQuery,
  toggleStatusFilter,
} = todosSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
