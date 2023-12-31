//let prompt = require('prompt-sync')();
//let cep = prompt('Número do CEP: ');

//Função assíncrona (não sabemos quando retorna)
async function buscarCEP() {
  limpar();
  //Esta variável é uma Promisse (um objeto que será preenchido quando a requisição HTTP retornar)
  //Atenção com as aspas, para passar o parâmetro CEP devemos usar a CRASE `
  // fetch = chame essa URL via get

  var txtCep = document.getElementById("txtCep");
  var cepInformado = txtCep.value;

  const promiseConsultaCEP = fetch(
    `https://viacep.com.br/ws/${cepInformado}/json/`
  )
    .then((resultado) => resultado.json())
    .then((json) => {
      //Essa condição funciona em javaScript é o equivalente a if(json.bairro != undefined && json.bairro != " ")
      //Significa que se o componente bairro estiver vazio ele deve ficar editável (no html ele foi programado para não ser editavel inicialmente)
      if (json.erro) {
        mostrarTelaErro();
      } else {
        preencherCamposComJSON(json);
      }
    })
    .catch((erro) => {
      mostrarTelaErro();
    });
}

function limpar() {
  txtUF.value = "";
  txtCidade.value = "";
  txtBairro.value = "";
  txtRua.value = "";

  txtUF.disabled = true;
  txtCidade.disabled = true;
  txtBairro.disabled = true;
  txtRua.disabled = true;
}

function preencherCamposComJSON(json) {
  if (json.bairro) {
    txtBairro.value = json.bairro;
  } else {
    txtBairro.disabled = false;
  }
  if (json.rua) {
    txtRua.value = json.rua;
  } else {
    txtRua.disabled = false;
  }

  txtUF.value = json.uf;
  txtCidade.value = json.localidade;
  txtBairro.value = json.bairro;
  txtRua.value = json.logradouro;
}

function mostrarTelaErro() {
  limpar();
  divDadosEncontrados.style = "background-color: red";
  alert("CEP informado não existe!");
}

function validarCEP(cepFormatado) {
  var fieldsetCep = document.getElementById("fieldset-consulta-cep");
  var cepValido = false;
  if (cepFormatado.length == 8) {
    fieldsetCep.style = "background-color: purple";
    cepValido = true;
  } else {
    fieldsetCep.style = "background-color: orange";
  }

  return cepValido;
}
