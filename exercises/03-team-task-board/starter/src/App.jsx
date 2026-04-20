import { teamMembers } from './data/team'
import { useTasks } from './context/TaskContext.jsx'; 
import { useState } from 'react';

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React (useReducer + Context API).
// Nothing here is wired up — no state, no dispatch, no context.
// Do not change the className values. Focus on React.

// Columns the board will always show
const COLUMNS = [
  { status: 'todo', label: 'To Do' },
  { status: 'inprogress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
]

// Placeholder tasks — hardcoded for display only.
// Your real tasks will come from useReducer state via Context.
const PLACEHOLDER_TASKS = [
  { id: 1, title: 'Set up project structure', priority: 'high', assigneeId: 1, status: 'done' },
  { id: 2, title: 'Build the task form', priority: 'medium', assigneeId: 2, status: 'inprogress' },
  { id: 3, title: 'Wire up Context API', priority: 'high', assigneeId: 1, status: 'todo' },
  { id: 4, title: 'Add priority filters', priority: 'low', assigneeId: 3, status: 'todo' },
]

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-green-100 text-green-700',
}

export default function App() {
  // destructure state and disptach to be able to access them globally
  const {state, dispatch} = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('high');
  const [assigneeId,  setAssigneeId] = useState(1);
  //barible to keep track of task id being moved
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  //state to keep in track of active column to drap over
  const [dragOverColumn, setDragOverColumn] = useState(null)
  

  

  return (
    <div className="min-h-screen bg-slate-100 flex">

     
      <aside className="w-52 shrink-0 bg-white border-r border-slate-200 p-5">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Team</h2>
        <ul className="space-y-3">
          {teamMembers.map(member => {
            //filtering each member tasks from tasks array
            const memberTasks = state.tasks.filter((t)=>t.assigneeId === member.id);
            //counting individual tasks
            const totalTasks = memberTasks.length;
            //filtering completed tasks & counting them
            const completedTasks = memberTasks.filter((t)=>{
              return t.status === 'done'
            }).length;
            
            return (
            <li key={member.id} className="flex items-center gap-2.5">
              <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full" />
              <div>
                <p className="text-sm font-medium text-slate-700">{member.name.split(' ')[0]}</p>
                <p className="text-xs text-slate-400">{member.role}</p>
                {/* displaying data on ui */}
                <p className='text-sm font-medium text-slate-700'>{totalTasks} Tasks . {completedTasks} Done</p>
              </div>
            </li>
          )})}
        </ul>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6 overflow-auto">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-slate-800">Team Board</h1>

          {/* Add task form — hardcoded, you will make this work */}
          <div className="flex gap-2">
            {/* onchange fun to update user typings */}
            <input
              type="text"
              value={title}
              placeholder="Task title..."
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* added onchange fn to update priority state */}
            <select className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none"
            onChange={(e)=> setPriority(e.target.value)}
            value={priority}>
              
              <option value='high' >High</option>
              <option value='medium'>Medium</option>
              <option value='low'>Low</option>
            </select>
            <select className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none"
            value={assigneeId}
            onChange={(e)=> setAssigneeId(Number(e.target.value))}>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
              ))}
            </select>
            {/* checking empty field before adding task/ add fn using dispatch and takes action and payload */}
            <button className="bg-indigo-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-indigo-700 transition-colors"
            onClick={()=>{ 
              if(title === '') return
               dispatch( {
              type: 'ADD_TASK',
              payload: {title, priority, assigneeId}
            })
            //resetting all title, assignee and priority after adding task.
            setTitle('');
            setAssigneeId(1);
            setPriority('high')
            }}>
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <select className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none"
          onChange={(e)=>{
            const value = e.target.value
            dispatch({
              type: 'SET_FILTER',
              payload: {assigneeId: value === ''? null : Number(value)}
            })
          }}>
            <option value={''}>All Members</option>
            {teamMembers.map(m => <option key={m.id}>{m.name}</option>)}
          </select>
          <select className="border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-sm outline-none"
          // func to handle filtering 
          onChange={(e)=>{
            //saving user selection as event
            const value = e.target.value;
            dispatch({
              type: 'SET_FILTER',
              payload: {
                priority: value === '' ? null : value }
            })
          }}>
            {/* adding the values to enable easy filtering */}
            <option value={''}>All Priorities</option>
            <option value={'high'}>High</option>
            <option value={'medium'}>Medium</option>
            <option value={'low'}>Low</option>
          </select>
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-4">
          {COLUMNS.map(col => {
            //filtering all tasks by status & assigneeId & priority
            const colTasks = state.tasks.filter(task => {
              const matchesStatus = task.status === col.status
              //filtering with assignee id
              const matchesAssignee =
                state.filters.assigneeId === null ||
                task.assigneeId === state.filters.assigneeId
              //filtering wiht priority
              const matchesPriority =
                state.filters.priority === null ||
                task.priority === state.filters.priority
              //returning with all matching conditions
              return matchesStatus && matchesAssignee && matchesPriority
            })
            return (
              // conditional ui changing while dragging over column
              <div key={col.status} className={col.status === dragOverColumn? "bg-green-200 rounded-2xl" : "bg-slate-200/70 rounded-xl p-3"}
              // preventing defaults events on drag over
              onDragOver={(e)=>e.preventDefault()}
              // moving cards to different status with ondrop
              onDrop={()=>{
                const id = draggedTaskId;
                const newStatus = col.status;
                dispatch({
                  type: 'MOVE_TASK',
                  payload: {id, newStatus}
                })
                // resetting dragged taskId and column ui colors
                setDraggedTaskId(null)
                setDragOverColumn(null)
              }}
              // saving column status on drag enter
              onDragEnter={()=>{
                setDragOverColumn(col.status)
              }}
              // resetting state after leaving column
              onDragLeave={()=>{
                setDragOverColumn(null)
              }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-600">{col.label}</h2>
                  <span className="bg-slate-300 text-slate-600 text-xs rounded-full px-2 py-0.5">
                    {colTasks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {colTasks.map(task => {
                    const assignee = teamMembers.find(m => m.id === task.assigneeId)
                    return (
                      <div key={task.id} className="bg-white rounded-lg p-3 shadow-sm"
                      //making card draggable
                      draggable={true}
                      // keeping task id on drag start
                      onDragStart={()=>setDraggedTaskId(task.id)}>
                        <p className="text-sm font-medium text-slate-800 mb-2 leading-snug">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs rounded-full px-2 py-0.5 font-medium capitalize ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </span>
                          {assignee && (
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              className="w-5 h-5 rounded-full"
                            />
                          )}

                          {/* added delete button to remove task from board */}
                        <button className='bg-red-400 rounded-md'
                        onClick={()=>{
                          const confirmed = window.confirm("Do you want to delete task ?");
                          if(confirmed){
                            dispatch({
                            type: 'DELETE_TASK',
                            payload: {id: task.id}
                        })
                          }
                          }
                        
                        }>🗑️</button>

                        </div> 
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
