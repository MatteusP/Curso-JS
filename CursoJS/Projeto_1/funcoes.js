const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        //caso a leitura seja bem sucedida os nov=mes dos arquivos serão retonados
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)

        } catch (e) {
            reject(e)

        }
    })
}

//função para ler apenas um arquivo
function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        } catch(e) {
            reject(e)
        }
    })
}

//função para ler varios arquivos retorna um array de caminhos
function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}


function elementosTerminadosCom(array, padrao) {
    return array.filter(el => el.endsWith(padrao))
}

module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    elementosTerminadosCom
}