const fs = require('fs');
const path = './tasks.json';

function loadOrCreateJSON() {
    let data;

    try {
        // Tentar ler o arquivo JSON
        const rawData = fs.readFileSync(path, 'utf8');
        data = JSON.parse(rawData);
        console.log("Tasks carregadas com sucesso.");
    } catch (err) {
        if (err.code === 'ENOENT') {
            // Arquivo não existe, então cria um novo
            data = {}; // ou um objeto com os dados iniciais que desejar
            fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
            console.log("Arquivo JSON não encontrado. Criando um novo arquivo.");
        } else {
            // Outro erro ao tentar ler o arquivo
            console.error("Erro ao carregar o arquivo JSON:", err);
            throw err;
        }
    }

    return data;
}

function printTasks(tasks){
    console.log('id | descrição | status | data add | data update')
    tasks.forEach(task => {
        console.log(task.id, ' | ', task.description, ' | ', task.status, ' | ', task.createdAt, ' | ', task.updatedAt)
    });
}

function saveAlteration(tasks){
    newTasks = JSON.stringify(tasks)
    fs.writeFile(path, newTasks, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo:', err);
            return;
        }
    });
}

module.exports = {loadOrCreateJSON, printTasks, saveAlteration}