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
module.exports = {loadOrCreateJSON}