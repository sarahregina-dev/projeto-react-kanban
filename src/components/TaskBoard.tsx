
import { Flex, Grid, Badge, ScrollArea} from '@radix-ui/themes'
import type { Task } from '../entities/Task'
import { TaskCard } from './TaskCard'

export const TaskBoard: React.FC = () => {

    const tasksTodo: Task[] = [{
      "id": 1,
      "title": "Enviar relatório",
      "description": "Enviar o relatório mensal para o departamento financeiro.",
      "status": "to-do",
      "priority": "high"
    
    }]
    const tasksInProgress: Task[] = [{
      "id": 2,
      "title": "Reunião com a equipe",
      "description": "Reunião para discutir o progresso do projeto e próximos passos.",
      "status": "in-progress",
      "priority": "high"
        
    }]
    const tasksDone: Task[] = [{
      "id": 3,
      "title": "Atualizar o site",
      "description": "Fazer atualizações no site da empresa com novas informações.",
      "status": "done",
      "priority": "medium"
    }]

  return (
    <ScrollArea scrollbars="horizontal" >
    <Grid columns="3" gap="4" minHeight="64rem">
        <Flex direction="column" gap="4">
            <Badge size={"3"} color="blue">
                To Do (2)
            </Badge>
            {tasksTodo.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Flex>
        <Flex direction="column" gap="4">
            <Badge size={"3"} color="yellow">
                In Progress (1)
            </Badge>
            {tasksInProgress.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Flex>
        <Flex direction="column" gap="4">
            <Badge size={"3"} color="green">
                Done (1)
            </Badge>
            {tasksDone.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Flex>
    </Grid>
    </ScrollArea>
  )
}

