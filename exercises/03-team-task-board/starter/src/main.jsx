import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './context/TaskContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Alice from './components/Alice.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <TaskProvider>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/alice' element={<Alice/>}/>
        <Route path='/bob' element/>
        <Route path='/carol' element/>
        <Route path='/david' element/>
        
      </Routes>
      </TaskProvider>
    </BrowserRouter>
    
  
)
