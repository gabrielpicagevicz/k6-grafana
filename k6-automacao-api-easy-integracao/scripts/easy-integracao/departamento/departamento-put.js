import {
  departamentoTestesAutomaticos,
  departamentoPUT,
  departamentoPUTInexistente,
} from "./postDepartamento.js";
import {
  makeRequest,
  checkStatus,
  checkErrorMessage,
} from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

export let options = {
  thresholds: {
    checks: [{ threshold: "rate == 1.00", abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

var codigo_departamento, returnAPI;
export function criarDepartamento() {
  describe("Cria um departamento para ser usado na alteração.", (t) => {
    const endpoint = `${baseUrl}/departamento/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      departamentoTestesAutomaticos,
      token
    );

    checkStatus(200, res.status);

    const responseBody = JSON.parse(res.body);

    returnAPI = res;
    t.expect(responseBody.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Departamento criado com sucesso");

    codigo_departamento = responseBody.dados.codigo_departamento;
  });
}

export function alterarDepartamentoInexistente() {
  describe("Alterando dados de departamento inexistente", (t) => {
    const endpoint = `${baseUrl}/departamento/update/`;

    const res = makeRequest("PUT", endpoint, departamentoPUTInexistente, token);
    checkStatus(400, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkErrorMessage("Este departamento não existe", resBodyJson.mensagem);
  });
}

export function alterandoDadosDepartamento() {
  describe("Alterar todos os dados do Departamento", (t) => {
    departamentoPUT.codigo_departamento = codigo_departamento;

    const endpoint = `${baseUrl}/departamento/update/`;

    const res = makeRequest("PUT", endpoint, departamentoPUT, token);
    checkStatus(200, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkErrorMessage(
      "Departamento atualizado com sucesso",
      resBodyJson.mensagem
    );
  });
}

export function deletandoDepartamento() {
  describe("Deletando o departamento criado", (t) => {
    departamentoPUT.codigo_departamento = codigo_departamento;

    const endpoint = `${baseUrl}/departamento/exclude/` + codigo_departamento;

    const res = makeRequest("DEL", endpoint, null, token);
    console.log("reposta do servidor: " + res.body);
    checkStatus(200, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkErrorMessage(
      "Departamento excluído com sucesso",
      resBodyJson.mensagem
    );
  });
}

export default function testSuite() {
  criarDepartamento();
  alterarDepartamentoInexistente();
  alterandoDadosDepartamento();
  deletandoDepartamento();
}
