import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './context/TaskContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <TaskProvider>
    <BrowserRouter>
    <App/>
      <Routes>
        <Route path='/alice' element/>
        <Route path='/bob' element/>
        <Route path='/carol' element/>
        <Route path='/david' element/>
        
      </Routes>
    </BrowserRouter>
    
  </TaskProvider>
)
