const functions = require('./functions.js')


const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');




tasks = functions.loadOrCreateJSON();
const rl = readline.createInterface({ input, output });

rl.on('line', (answer) => {
    command = answer.match(/"[^"]*"|\S+/g);

    // Função para formatar a data como AAAA-MM-DD
    const dataAtual = new Date();
    const formatoData = dataAtual.getFullYear() + '-' +
        String(dataAtual.getMonth() + 1).padStart(2, '0') + '-' +
        String(dataAtual.getDate()).padStart(2, '0');

    switch (command[0]) {
        case 'add':
            taskDesc = command[1].replaceAll('"', '')
            proxId = Number(tasks.reduce((max, obj) => obj.id > max ? obj.id : max, 0)) + 1;

            newTask = {
                id: proxId.toString(),
                description: taskDesc,
                status: 'todo',
                createdAt: formatoData,
                updatedAt: formatoData
            }

            tasks.push(newTask)
            functions.saveAlteration(tasks)
            console.log("Task criada com sucesso !")
            break;
        case 'update':
            id = command[1]
            taskToUpdate = tasks.find(obj => obj.id === id);
            if (taskToUpdate) {
                taskToUpdate.description = command[2].replaceAll('"', '')
                taskToUpdate.updatedAt = formatoData
                functions.saveAlteration(tasks)
                console.log("Task ", id, ' atualizada com sucesso! ')
            } else {
                console.log('Task não encontrada !')
            }

            break;
        case 'del':
            id = command[1]
            tasks = tasks.filter(obj => obj.id !== id);
            //TODO: Verificar se a task existe
            functions.saveAlteration(tasks)
            console.log("Task ", id, ' deletada com sucesso! ')
            break;
        case 'list':

            if (command.length == 1) {
                functions.printTasks(tasks)
            } else {
                switch (command[1]) {
                    case 'todo':
                        todoTasks = tasks.filter((a) => a.status == 'todo')
                        functions.printTasks(todoTasks)
                        break;
                    case 'in-progress':
                        inProgressTasks = tasks.filter((a) => a.status == 'in-progress')
                        functions.printTasks(inProgressTasks)
                        break;
                    case 'done':
                        doneTasks = tasks.filter((a) => a.status == 'done')
                        functions.printTasks(doneTasks)
                        break;

                    default:
                        break;
                }
            }

            break;
        case 'mark-in-progress':
            id = command[1]
            taskToUpdate = tasks.find(obj => obj.id === id);
            if (taskToUpdate) {
                taskToUpdate.status = 'in-progress'
                taskToUpdate.updatedAt = formatoData
                functions.saveAlteration(tasks)
                console.log('Task moved to in progress !')
            } else {
                console.log('Task não encontrada !')
            }

            break;
        case 'mark-done':
            id = command[1]
            taskToUpdate = tasks.find(obj => obj.id === id);
            if (taskToUpdate) {
                taskToUpdate.status = 'done'
                taskToUpdate.updatedAt = formatoData
                functions.saveAlteration(tasks)
                console.log('Task moved to done !')
            } else {
                console.log('Task não encontrada !')
            }

            break;
        case 'mark-todo':
            id = command[1]
            taskToUpdate = tasks.find(obj => obj.id === id);
            if (taskToUpdate) {
                taskToUpdate.status = 'todo'
                taskToUpdate.updatedAt = formatoData
                functions.saveAlteration(tasks)
                console.log('Task moved to To do !')
            } else {
                console.log('Task não encontrada !')
            }

            break;

        default:
            console.log('Command not supported.')
            break;
    }


    console.log('')

});
