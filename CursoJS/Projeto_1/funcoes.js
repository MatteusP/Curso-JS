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

// filtra os arquivos para retirar os desnecessarios
function elementosTerminadosCom(array, padraoTextual) {
    return array.filter(el => el.endsWith(padraoTextual))
}

//filtra a partir do array todas as linhas vazias
function removerSeVazio(array) {
    return array.filter(el => el.trim()) //trim tira os espaços em branco
}

//função para excluir todas as linhas com determinado trecho "-->"
function removerseIncluir(array, padraoTextual){
    return array.filter(el => !el.includes(padraoTextual))
}

// função para remover linhas apenas com numeros
function removerSeApenasNumero(array){
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num
    })
}


module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    elementosTerminadosCom,
    removerSeVazio,
    removerseIncluir,
    removerSeApenasNumero
}