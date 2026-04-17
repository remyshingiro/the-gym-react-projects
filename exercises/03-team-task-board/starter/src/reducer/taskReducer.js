import { useReducer } from "react"
import {v4 as uuidv4} from 'uuid';
/*
ACTIONS:

ADD_TASK → Adds a new task to the list
DELETE_TASK → Removes a task by id
MOVE_TASK → Updates the status of a task
SET_FILTER → Updates filtering criteria (assignee + priority)

Why:
To centralize all task-related state changes and keep logic predictable.
*/


export const initialState = {
    tasks: [],
    filters: {
        assigneeId: null,
        priority: null
    }
}

//try generating id wih uuidv4 rather than date
export function taskReducer(state, action) {
    switch(action.type) {
        case 'ADD_TASK': {
            const {title, priority, assigneeId} = action.payload;   
            const newTask = {
                id: uuidv4(),
                title,
                priority,
                assigneeId,
                status: 'todo'
            }

            return {
                ...state,
                tasks: [...state.tasks, newTask]
            }
        }

        case 'DELETE_TASK': {
            const {id} = action.payload;
            const updatedTasks = state.tasks.filter( task => task.id !== id)
            return{
                ...state,
                tasks: updatedTasks
            }
        }

        case 'MOVE_TASK': {
            const {id, newStatus} = action.payload;
            const updatedTasks = state.tasks.map(task => {
                if(task.id === id) return{...task, status: newStatus}
                else return task
            })
            return{
                ...state,
                tasks: updatedTasks
            }
        }
        
        case 'SET_FILTER': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            }
        }
        
        default:
            return state
    }
}