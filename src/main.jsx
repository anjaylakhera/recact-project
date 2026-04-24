import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './store/store'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme/theme.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
