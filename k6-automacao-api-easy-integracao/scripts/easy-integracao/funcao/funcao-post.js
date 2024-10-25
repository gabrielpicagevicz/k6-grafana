import {
  funcao,
  funcaoTestesAutomaticosSemHeader,
  funcaoTestesAutomaticosTokenInvalido,
  funcaoTestesAutomaticosEndPointInexistente,
  funcaoTestesAutomaticosMaxCaractereCodigo,
  funcaoTestesAutomaticosMaxCaractereDescricao,
  funcaoCodigoNull,
  funcaoCodigoJaExistente,
  funcaoPUTInexistente,
} from "./postFuncao.js";
import {
  makeRequest,
  checkStatus,
  checkErrorInList,
  checkErrorMessage,
  makeRequestSemHeader,
} from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemafuncaoPOST } from "../funcao/funcao-schema.js";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

export let options = {
  thresholds: {
    //falhar o teste se qualquer verificação falhar ou se qualquer requisição falhar
    checks: [{ threshold: "rate == 1.00", abortOnFail: true }],
    //http_req_failed: [{ threshold: "rate == 0.00", abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

var codigo_funcao, returnAPI;
export function criarFuncao() {
  describe("Payload completo com todos os campos obrigatórios preenchidos corretamente.", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequest("POST", endpoint, funcao, token);

    checkStatus(200, res.status);

    const responseBody = JSON.parse(res.body);

    console.log(`Resposta do servidor: ${res.body}`);

    returnAPI = res;
    t.expect(responseBody.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Função criada com sucesso");

    codigo_funcao = responseBody.dados.codigo_funcao;
    console.log("Funcao: " + codigo_funcao);
  });
}

export function verificaTokenInvalido() {
  describe("Enviando request tokens inválido", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      funcaoTestesAutomaticosTokenInvalido,
      "token_inexistente"
    );

    const resBodyJson = JSON.parse(res.body);
    checkStatus(403, res.status);
    checkErrorMessage("Token inválido", resBodyJson.mensagem);
  });
}

export function verificaTokenSemHeader() {
  describe("Enviando request sem header", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequestSemHeader(
      "POST",
      endpoint,
      funcaoTestesAutomaticosSemHeader,
      token
    );

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);
    checkStatus(401, res.status);
    checkErrorMessage("Token não foi informado", resBodyJson.mensagem);
  });
}

export function verificaReqEndPointInexistente() {
  describe("Enviando request em um endpoint que não existe", (t) => {
    const endpoint = `${baseUrl}/funcao/createsssssssssssssssssssssss`;
    const res = makeRequest(
      "POST",
      endpoint,
      funcaoTestesAutomaticosEndPointInexistente,
      token
    );

    checkStatus(404, res.status);
  });
}

function validateSchemafuncao() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em funcao-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemafuncaoPOST);
  });
}

export function criarFuncaoQtdMaximaCaractereCodigo() {
  describe("Verifica se API valida permissão de cadastro de funcao com código no máximo de 60 caracteres", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      funcaoTestesAutomaticosMaxCaractereCodigo,
      token
    );

    checkStatus(422, res.status);

    const responseBody = JSON.parse(res.body);

    checkErrorInList(
      "O tamanho máximo do código é 60 caracteres",
      responseBody.errors[0]
    );
  });
}

export function criarFuncaoQtdMaximaCaractereDescricao() {
  describe("Verifica se API valida permissão de cadastro de funcao com descrição no máximo de 60 caracteres", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      funcaoTestesAutomaticosMaxCaractereDescricao,
      token
    );

    checkStatus(422, res.status);

    const responseBody = JSON.parse(res.body);

    checkErrorInList(
      "O tamanho máximo da descrição é 60 caracteres",
      responseBody.errors[0]
    );
  });
}

export function criarFuncaoCodigoNull() {
  describe("Verifica se API valida permissão de cadastro de funcao com código null", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequest("POST", endpoint, funcaoCodigoNull, token);

    checkStatus(422, res.status);

    const responseBody = JSON.parse(res.body);

    checkErrorInList(
      "O código da função é obrigatório.",
      responseBody.errors[0]
    );
  });
}

export function criarFuncaoCodigoJaExistente() {
  funcaoCodigoJaExistente.codigo_funcao = codigo_funcao;
  describe("Verifica se API valida permissão de cadastro de funcao com código já existente", (t) => {
    const endpoint = `${baseUrl}/funcao/create`;
    const res = makeRequest("POST", endpoint, funcaoCodigoJaExistente, token);

    checkStatus(400, res.status);

    const responseBody = JSON.parse(res.body);

    checkErrorMessage(
      "Já existe uma função com este código",
      responseBody.mensagem
    );
  });
}

export function alterarFuncaoInexistente() {
  describe("Alterando dados de função inexistente", (t) => {
    const endpoint = `${baseUrl}/funcao/update/`;

    const res = makeRequest("PUT", endpoint, funcaoPUTInexistente, token);
    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkErrorMessage("Esta função não existe", resBodyJson.mensagem);
  });
}

export default function testSuite() {
  criarFuncao();
  verificaTokenInvalido();
  verificaTokenSemHeader();
  verificaReqEndPointInexistente();
  validateSchemafuncao();
  criarFuncaoQtdMaximaCaractereCodigo();
  criarFuncaoQtdMaximaCaractereDescricao();
  criarFuncaoCodigoNull();
  criarFuncaoCodigoJaExistente();
  alterarFuncaoInexistente();
}
