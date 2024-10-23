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
                
            if(command.length == 1){
                console.log(tasks)
            }else{
                switch (command[1]) {
                    case 'todo':
                        
                        break;
                    case 'in-progress':
                        
                        break;
                    case 'done':
                        
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
    


});
