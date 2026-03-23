import {Box, TextField, RadioGroup, Text, TextArea, Button, Dialog, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export const CreateTaskForm : React.FC = () => {
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
                <form >
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
                                <RadioGroup.Item 
                                value="to-do"> Para Fazer
                                </RadioGroup.Item>
                                <RadioGroup.Item 
                                value="in-progress"> Em Andamento
                                </RadioGroup.Item>
                                <RadioGroup.Item 
                                value="done"> Concluída
                                </RadioGroup.Item>
                            </RadioGroup.Root>
                        </Box>
                        <Box>
                            <Text as="div" mb="2">Prioridade</Text>
                            <RadioGroup.Root name="priority" defaultValue="medium">
                                <RadioGroup.Item 
                                value="low"> Baixa
                                </RadioGroup.Item>
                                <RadioGroup.Item 
                                value="medium"> Média
                                </RadioGroup.Item>
                                <RadioGroup.Item 
                                value="high"> Alta
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