import { Flex, Grid, Badge, ScrollArea } from '@radix-ui/themes'
import type { Task } from '../entities/Task'
import { TaskCard } from './TaskCard'
import { useContext } from 'react'
import { TasksContext } from '../contexts/TaskContext'


export const TaskBoard: React.FC = () => {
    const { tasks } = useContext(TasksContext)

    const tasksTodo: Task[] = tasks.filter((task: Task) => task.status === 'to-do') ?? []
    const tasksInProgress: Task[] = tasks.filter((task: Task) => task.status === 'in-progress') ?? []
    const tasksDone: Task[] = tasks.filter((task: Task) => task.status === 'done') ?? []

    return (
        <ScrollArea scrollbars="horizontal">
            <Grid columns="3" gap="4" minHeight="64rem">
                <Flex direction="column" gap="4">
                    <Badge size={"3"} color="blue">
                        To Do ({tasksTodo.length})
                    </Badge>
                    {tasksTodo.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Flex>
                <Flex direction="column" gap="4">
                    <Badge size={"3"} color="yellow">
                        In Progress ({tasksInProgress.length})
                    </Badge>
                    {tasksInProgress.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Flex>
                <Flex direction="column" gap="4">
                    <Badge size={"3"} color="green">
                        Done ({tasksDone.length})
                    </Badge>
                    {tasksDone.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Flex>
            </Grid>
        </ScrollArea>
    )
}