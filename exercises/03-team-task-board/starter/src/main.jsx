import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './context/TaskContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Member from './components/MemberTasks.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <TaskProvider>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/member/:id' element={<Member/>}/>
        
      </Routes>
      </TaskProvider>
    </BrowserRouter>
    
  
)
