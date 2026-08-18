import {createContext, useContext, useEffect, useState, type ReactNode} from 'react'
import type { Task } from '../entities/Task'
import { tasksService } from '../services/api'

export interface TasksContextData {
    tasks: Task[]
    createTask: (attributes: Omit<Task, 'id'>) => Promise<void>
    updateTask: (id: string, attributes: Partial<Omit<Task, 'id'>>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
}

export const TasksContext = createContext ({} as TasksContextData)

interface TasksContextProviderProps {
    children: ReactNode
}

export const TasksProvider: React.FC<TasksContextProviderProps> = ({ children }) => {
     const [tasks, setTasks] = useState<Task[]>([])

     useEffect(() => {
        tasksService.fetchTasks().then((data) => { setTasks(data) })
     }, [])

    const createTask = async (attributes: Omit<Task, 'id'>): Promise<void> => {
        const newTask = await tasksService.createTask(attributes)
        setTasks((currentTasks) => [...currentTasks, newTask])
    }

    const updateTask = async (id: string, attributes: Partial<Omit<Task, 'id'>>): Promise<void> => {
        const updatedTask = await tasksService.updateTask(id, attributes)
        setTasks((currentTasks) => currentTasks.map((task) => String(task.id) === id ? updatedTask : task))
    }

    const deleteTask = async (id: string): Promise<void> => {
        await tasksService.deleteTask(id)
        setTasks((currentTasks) => currentTasks.filter((task) => String(task.id) !== id))
}

    return (
        <TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask } as TasksContextData}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)