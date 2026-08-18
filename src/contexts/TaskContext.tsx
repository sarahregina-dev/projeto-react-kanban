import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { Task } from '../entities/Task'
import { tasksService } from '../services/api'

export interface TasksContextData {
    tasks: Task[]
    createTask: (attributes: Omit<Task, 'id'>) => Promise<Task>
    updateTask: (id: string, attributes: Partial<Omit<Task, 'id'>>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextData)

interface TasksContextProviderProps {
    children: ReactNode
}

export const TasksProvider: React.FC<TasksContextProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        tasksService.fetchTasks().then((data) => { setTasks(data) })
    }, [])

    const createTask = async (attributes: Omit<Task, 'id'>) => {
        const task = await tasksService.createTask(attributes)
        setTasks((prev) => [...prev, task])
        return task
    }

    const updateTask = async (id: string, attributes: Partial<Omit<Task, 'id'>>) => {
        await tasksService.updateTask(id, attributes)
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...attributes } : task))
        )
    }

    const deleteTask = async (id: string) => {
        await tasksService.deleteTask(id)
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    return (
        <TasksContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    )
}