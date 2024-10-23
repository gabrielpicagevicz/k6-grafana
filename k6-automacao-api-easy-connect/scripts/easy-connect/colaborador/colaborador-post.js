import http from "k6/http";
import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import {
  colaborador,
  criarColaboradorOpcionaisPreenchidosNulo as opcoesNulas,
  colaboradorCPFInvalido as colaboradorCpfErrado,
  colaboradorResponsavelCPFOmitido,
  criarColaboradorOmitindoCNPJCPF as cnpjcpffaltando,
  criarColaboradorOmitindoNome as nomefaltando,
  criarColaboradorOmitindoCPF as cpffaltando,
  criarColaboradorOmitindoCodigoMunicipio as codigoMunicipioFaltando,
  criarColaboradorOmitindoCodigoJornada as codigoJornada,
} from "./postColaborador.js";
import {
  makeRequest,
  checkStatus,
  checkErrorInList,
  checkErrorMessage,
} from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schema } from "../colaborador/colaborador-schema.js";

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

var returnAPI;
export function criarColaborador() {
  describe("Payload completo com todos os campos obrigatórios preenchidos corretamente.", (t) => {

    //const endpoint = `${__ENV.BASE_URL}/colaborador/create`;

    http.post(`http://${__ENV.BASE_URL}/colaborador/create`);

    //const res = makeRequest("POST", endpoint, colaborador,  `${__ENV.BASE_URL}`);

    console.log(res.body);

    returnAPI = res;
    checkStatus(201, res.status);
  });
}

function validateSchemaColaborador() {
  describe("Create a new funcionario", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schema);
  });
}

export function criarColaboradorComOpcoesNulas() {
  describe("Campos Opcionais Preenchidos com Nulo", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, opcoesNulas, token);
    checkStatus(201, res.status);
  });
}

export function criarColaboradorComCPFInvalido() {
  describe("Criar colaborador com CPF inválido", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, colaboradorCpfErrado, token);

    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("Mínimo de caracteres no CPF é 11", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCPFResponsavel() {
  describe("Criação de colaborador com campo CPF Responsável faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      colaboradorResponsavelCPFOmitido,
      token
    );

    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O CPF do responsável é obrigatório", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCNPJCPF() {
  describe("Criação de colaborador com campo CNPJCPF faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, cnpjcpffaltando, token);

    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O CNPJ/CPF é obrigatório", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoNome() {
  describe("Criação de colaborador com campo nome faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, nomefaltando, token);

    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O nome é obrigatório", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCPF() {
  describe("Criação de colaborador com campo CPF faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, cpffaltando, token);

    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O CPF é obrigatório", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCodigoMunicipio() {
  describe("Criação de colaborador com campo CodigoMunicipio faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, codigoMunicipioFaltando, token);

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O código do município é obrigatório", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCodigoJornada() {
  describe("Criação de colaborador com campo CodigoJornada faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, codigoJornada, token);

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O código", resBodyJson.errors);
  });
}

export default function testSuite() {
  criarColaborador();
  validateSchemaColaborador();
  criarColaboradorComOpcoesNulas();
  criarColaboradorComCPFInvalido();
  criarColaboradorOmitindoCPFResponsavel();
  criarColaboradorOmitindoCNPJCPF();
  criarColaboradorOmitindoNome();
  criarColaboradorOmitindoCPF();
  criarColaboradorOmitindoCodigoMunicipio();
}
