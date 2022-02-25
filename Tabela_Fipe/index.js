var axios = require("axios");

var dados;

function consultarMarcas() {
    return axios.post("https://veiculos.fipe.org.br/api/veiculos//ConsultarMarcas", { codigoTabelaReferencia: 282, codigoTipoVeiculo: 1 })
}
function consultarModelos(codigoMarca) {
    return axios.post("https://veiculos.fipe.org.br/api/veiculos//ConsultarModelos", { codigoTabelaReferencia: 282, codigoTipoVeiculo: 1, codigoMarca: codigoMarca })
}
function consultarAnoModelo(codigoMarca, codigoModelo) {
    return axios.post("https://veiculos.fipe.org.br/api/veiculos//ConsultarAnoModelo", { codigoTabelaReferencia: 282, codigoTipoVeiculo: 1, codigoMarca: codigoMarca, codigoModelo: codigoModelo })
}
function consultarTodosParametros(codigoMarca, codigoModelo, anoModelo, codigoTipoCombustivel) {
    return axios.post("https://veiculos.fipe.org.br/api/veiculos//ConsultarValorComTodosParametros", { codigoTabelaReferencia: 282, codigoMarca: codigoMarca, codigoModelo: codigoModelo, codigoTipoVeiculo: 1, anoModelo: anoModelo, codigoTipoCombustivel: codigoTipoCombustivel, tipoVeiculo: 'carro', modeloCodigoExterno: '',tipoConsulta: 'tradicional'})
}

function justNumbers(text) {
    var numbers = text.replace(/[^0-9]/g,'');
    return parseInt(numbers);
}


dados = consultarMarcas();

dados.then(function (resposta) {
    const marcas = resposta.data
    for (i = 0; i < marcas.length; i++){
        const marca = marcas[i]
        const codigoMarca = marca['Value']
        consultarModelos(codigoMarca).then(respostaModelo => {
            const modelos = respostaModelo.data['Modelos']
            for (x = 0; x < modelos.length; x++){
                const codigoModelo = modelos[x]['Value']
                consultarAnoModelo(codigoMarca, codigoModelo).then(respostaAnoModelo => {
                    const anoModelo = respostaAnoModelo.data
                    for (let z = 0; z < anoModelo.length; z++) {
                        const carro = anoModelo[z]['Label']
                        const ano = justNumbers(carro)
                        if (carro.includes('Gasolina')) {
                            const tipoCombustivel = 1
                            consultarTodosParametros(codigoMarca, codigoModelo, ano, tipoCombustivel).then(respostaTodosParametros => {
                                console.log(respostaTodosParametros.data)
                            })
                        }
                        else {
                            const tipoCombustivel = 3
                            consultarTodosParametros(codigoMarca, codigoModelo, ano, tipoCombustivel).then(respostaTodosParametros => {
                                console.log(respostaTodosParametros.data)
                            })
                        }    
                    }
                })
            }
        })
    }
})      