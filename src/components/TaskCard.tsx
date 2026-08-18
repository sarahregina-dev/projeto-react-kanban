import { Card, Flex, Heading, Badge, Text, Button } from "@radix-ui/themes"
import type { Task } from "../entities/Task"

interface TaskCardProps {
    task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const getActionText = (status: string) => {
        switch (status) {
            case 'to-do':
                return 'To Do'
            case 'in-progress':
                return 'In Progress'
            case 'done':
                return 'Done'
            default:
                return 'Unknown'
        }
    }

    const getActionColor = (status: string) => {
        switch (status) {
            case 'to-do':
                return 'blue'
            case 'in-progress':
                return 'amber' // Nota: Radix Themes usa 'amber' em vez de 'yellow' para melhor contraste
            case 'done':
                return 'green'
            default:
                return 'gray'
        }
    } // <-- Esta chave de fechamento estava faltando

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':    
                return 'red'
            case 'medium':
                return 'amber'
            case 'low':
                return 'green'
            default:
                return 'gray'
        }
    }

    return (
        <Card> 
            <Flex align="center" gap="4">
                <Heading as="h3" weight="bold" size="3">
                    {task.title}
                </Heading>
                <Badge color={getPriorityColor(task.priority)}>
                    {task.priority}
                </Badge>
            </Flex>

            <Text as="p" my="4">
                {task.description}
            </Text>

            <Flex gap="2">
                <Button color={getActionColor(task.status)} size="2" variant="soft">
                    {getActionText(task.status)}
                </Button>
                <Button color="red">Excluir</Button>
            </Flex>
        </Card>
    )
}