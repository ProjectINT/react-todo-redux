import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { TodoBoard } from './components/TodoBoard'

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" sx={{ minHeight: '100vh', p: 4, bgcolor: 'background.default' }}>
        <TodoBoard />
      </Box>
    </ThemeProvider>
  )
}

export default App
