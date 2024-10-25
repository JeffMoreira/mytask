const functions = require('./functions.js')


const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');




const tasks = functions.loadOrCreateJSON();
const rl = readline.createInterface({ input, output });

rl.on('line', (answer) => {
    command = answer.split(' ')

    switch (command[0]) {
        case 'add':
            console.log('add task')
            break;
        case 'update':
            console.log('update task')
            break;
        case 'del':
            console.log('delete task')
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
            console.log('move to in progress task')
            break;
        case 'mark-done':
            console.log('move to done task')
            break;
        case 'mark-todo':
            console.log('move to todo task')
            break;

        default:
            console.log('Command not supported.')
            break;
    }

    console.log('')

});
