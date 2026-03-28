import { Routes, Route } from 'react-router-dom'
import Login from './components/login.jsx'
import UserList from './components/UserList.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  )
}

export default App
              
