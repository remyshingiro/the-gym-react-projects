import { useReducer, useContext, createContext } from "react";
import { taskReducer, initialState } from "../reducer/taskReducer.js";

export const TaskContext = createContext();

function getInitialValue(){
    const stored = localStorage.getItem('tasks_state');
    if(stored){
        return JSON.parse(stored);
    } else{
        return initialState
    }

}

export default function TaskProvider({children}) {
    const [state, dispatch] = useReducer(taskReducer,initialState, getInitialValue() );
    return(
        <TaskContext.Provider value={{state, dispatch}}>
        {children}
         </TaskContext.Provider>
    )
    
}

export  function useTasks() {
    const context = useContext(TaskContext);
    if(!context){
        throw new Error('useTasks must be used within TaskProvider')
    }

    return context;
}