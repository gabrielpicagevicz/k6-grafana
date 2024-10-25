import {
  departamentoTestesAutomaticos,
  departamentoTestesAutomaticosMaxCaractereCodigo,
  departamentoTestesAutomaticosMaxCaractereDescricao,
  departamentoCodigoNull,
  departamentoTestesAutomaticosTokenInvalido,
  departamentoTestesAutomaticosEndPointInexistente,
  departamentoTestesAutomaticosSemHeader,
  departamentoCodigoJaExistente,
} from "./postDepartamento.js";
import {
  makeRequest,
  checkStatus,
  checkErrorInList,
  checkErrorMessage,
  makeRequestSemHeader,
} from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemaDepartamentoPOST } from "../departamento/departamento-schema.js";

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

export function verificaTokenInvalido() {
  describe("Enviando request tokens inválido", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoTestesAutomaticosTokenInvalido,
      "token_inexistente"
    );

    const resBodyJson = JSON.parse(res.body);
    checkStatus(403, res.status);
    checkErrorMessage("Token inválido", resBodyJson.mensagem);
  });
}

export function verificaTokenSemHeader() {
  describe("Enviando request sem header", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequestSemHeader(
      "POST",
      endpoint,
      departamentoTestesAutomaticosSemHeader,
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
    const endpoint = `${baseUrl}/departamento/createsssssssssssssssssssssss`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoTestesAutomaticosEndPointInexistente,
      token
    );

    checkStatus(404, res.status);
  });
}

var codigo_departamento, returnAPI;
export function criarDepartamento() {
  describe("Payload completo com todos os campos obrigatórios preenchidos corretamente.", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoTestesAutomaticos,
      token
    );

    checkStatus(200, res.status);

    const responseBody = JSON.parse(res.body);

    console.log(`Resposta do servidor: ${res.body}`);

    returnAPI = res;
    t.expect(responseBody.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Departamento criado com sucesso");

    codigo_departamento = responseBody.dados.codigo_departamento;
    console.log("Departamento criado: " + codigo_departamento);
  });
}

function validateSchemaDepartamento() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em departamento-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemaDepartamentoPOST);
  });
}

export function criarDepartamentoQtdMaximaCaractereCodigo() {
  describe("Verifica se API valida permissão de cadastro de departamento com código no máximo de 60 caracteres", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoTestesAutomaticosMaxCaractereCodigo,
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

export function criarDepartamentoQtdMaximaCaractereDescricao() {
  describe("Verifica se API valida permissão de cadastro de departamento com descrição no máximo de 60 caracteres", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoTestesAutomaticosMaxCaractereDescricao,
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

export function criarDepartamentoCodigoNull() {
  describe("Verifica se API valida permissão de cadastro de departamento com código null", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest("POST", endpoint, departamentoCodigoNull, token);

    checkStatus(422, res.status);

    const responseBody = JSON.parse(res.body);

    checkErrorInList(
      "O código do departamento é obrigatório.",
      responseBody.errors[0]
    );
  });
}

export function criarDepartamentoCodigoJaExistente() {
  departamentoCodigoJaExistente.codigo_departamento = codigo_departamento;
  describe("Verifica se API valida permissão de cadastro de departamento com código já existente", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoCodigoJaExistente,
      token
    );

    checkStatus(400, res.status);

    const responseBody = JSON.parse(res.body);

    checkErrorMessage(
      "Já existe um departamento com este código",
      responseBody.mensagem
    );
  });
}

export default function testSuite() {
  verificaTokenInvalido();
  verificaTokenSemHeader();
  verificaReqEndPointInexistente();
  criarDepartamento();
  validateSchemaDepartamento();
  criarDepartamentoQtdMaximaCaractereCodigo();
  criarDepartamentoQtdMaximaCaractereDescricao();
  criarDepartamentoCodigoNull();
  criarDepartamentoCodigoJaExistente();
}
