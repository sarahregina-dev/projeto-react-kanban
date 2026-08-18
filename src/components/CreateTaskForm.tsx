import {Box, Badge, TextField, RadioGroup, Text, TextArea, Button, Dialog, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";



const CreateTaskSchema = {
    title: z.string(),
    description: z.string(),
    status: z.enum(["to-do", "in-progress", "done"]),
    priority: z.enum(["low", "medium", "high"])
}

export const CreateTaskForm : React.FC = () => {
    const { createTask } = useTasks()
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault();
        
        const formData = new FormData(ev.currentTarget)
        const title = formData.get("title") 
        const description = formData.get("description") 
        const status = formData.get("status") 
        const priority = formData.get("priority")
        
        ev.currentTarget.reset()

        const taskData =  CreateTaskSchema.parse({ title, description, status, priority }) ;
        await createTask(taskData)

    };

    return (
   
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>
                    <PlusIcon /> Nova Tarefa
                </Button>
            </Dialog.Trigger>
           
           
            <Dialog.Content maxWidth="32rem" >
                <Dialog.Title> Nova tarefa </Dialog.Title>
                <Dialog.Description size="2" mb="4"> Adicione novas tarefas ao seu quadro. </Dialog.Description> 
                <form onSubmit={handleSubmit}>
                <Flex direction="column" gap="4">
                    <Box maxWidth="32rem">
                        <Box mb="2">
                            <Text as="label" htmlFor="title">Título</Text>
                        </Box>
                        <TextField.Root id="title" placeholder="Digite o título da tarefa..."  name="title" autoFocus required />
                    </Box>

                    <Box maxWidth="32rem">
                        <Box mb="2">
                            <Text as="label" htmlFor="description">Descrição</Text>
                        </Box>
                        <TextArea id="description" placeholder="Digite a descrição da tarefa..." name="description" required/>
                    </Box>

                    <Flex gap="8">
                        <Box>
                            <Text as="div" mb="2">Situação</Text>
                            <RadioGroup.Root name="status" defaultValue="to-do">
                                <RadioGroup.Item value="to-do"> 
                                    <Badge color = "blue" > Para Fazer </Badge> 
                                </RadioGroup.Item>
                                <RadioGroup.Item value="in-progress"> <Badge color = "default" > Em Andamento </Badge>
                                </RadioGroup.Item>
                                <RadioGroup.Item  value="done"> <Badge color = "green" > Concluída </Badge>
                                </RadioGroup.Item>
                            </RadioGroup.Root>
                        </Box>
                        <Box>
                            <Text as="div" mb="2">Prioridade</Text>
                            <RadioGroup.Root name="priority" defaultValue="medium">
                                <RadioGroup.Item 
                                value="low"> <Badge color = "amber" > Baixa </Badge>
                                </RadioGroup.Item>
                                <RadioGroup.Item 
                                value="medium"> <Badge color = "orange" > Média </Badge>
                                </RadioGroup.Item>
                                <RadioGroup.Item 
                                value="high"> <Badge color = "tomato" > Alta </Badge>
                                </RadioGroup.Item>
                            </RadioGroup.Root>
                        </Box>
                    </Flex>
                    <Flex gap="2" justify="end">
                        <Dialog.Close>
                            <Button color="gray" variant="soft">Cancelar</Button>
                        </Dialog.Close>
                        <Button type="submit">Criar Tarefa</Button>
                    </Flex>
                </Flex>
                </form>
    
            </Dialog.Content>

        </Dialog.Root>
       
    )
}