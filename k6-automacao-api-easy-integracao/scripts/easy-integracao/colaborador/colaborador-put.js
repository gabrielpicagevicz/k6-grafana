import {
  colaborador,
  colaboradorPUT,
  colaboradorPUTSemID,
  colaboradorPUTDataadmissaoIncorreta,
  colaboradorPUTInexistente,
  colaboradorPUTStatusAtestado,
} from "./postColaborador.js";
import {
  makeRequest,
  checkStatus,
  checkErrorInList,
  checkErrorMessage,
  makeRequestSemHeader,
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

var id_colaborador;

export function criarColaborador() {
  describe("Primeiro cria um colaborador para usar no PUT", (t) => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, colaborador, token);
    const responseBody = JSON.parse(res.body);

    checkStatus(201, res.status);

    if (responseBody.mensagem !== "Colaborador cadastrado com sucesso") {
      console.error(`Erro ao criar colaborador: ${responseBody.mensagem}`);
    }

    // Pega o id do colaborador criado
    id_colaborador = responseBody.dados.id_colaborador;
  });
}

export function alterarColaboradorUsuarioJaExistente() {
  describe("Verifica disponibilidade de alterar usuário já existente", (t) => {
    const endpoint = `${baseUrl}/colaborador/update/`;

    const res = makeRequest("PUT", endpoint, colaborador, token);

    checkStatus(409, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorInList(
      "Este usuário já está sendo utilizado",
      resBodyJson.errors[0]
    );
  });
}

export function alterarColaborador() {
  describe("Alterar todos os dados do colaborador", (t) => {
    colaboradorPUT.id_colaborador = id_colaborador;

    const endpoint = `${baseUrl}/colaborador/update/`;
    const res = makeRequest("PUT", endpoint, colaboradorPUT, token);

    checkStatus(201, res.status);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);

    checkErrorMessage(
      "Colaborador atualizado com sucesso",
      resBodyJson.mensagem
    );
  });
}

export function alterarColaboradorSemPassarID() {
  describe("Verifica disponibilidade de alterar status do colaborador sem passar o id", (t) => {
    const endpoint = `${baseUrl}/colaborador/update/`;

    const res = makeRequest("PUT", endpoint, colaboradorPUTSemID, token);

    checkStatus(400, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorInList(
      "O ID do colaborador é obrigatório",
      resBodyJson.errors[0]
    );
  });
}

export function alterarColaboradorPassandoDataAdmissaoIncorreta() {
  describe("Altera data admissao do colaborador incorretamente", (t) => {
    const endpoint = `${baseUrl}/colaborador/update/`;

    const res = makeRequest(
      "PUT",
      endpoint,
      colaboradorPUTDataadmissaoIncorreta,
      token
    );
    checkStatus(400, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorInList(
      "A data de admissão precisa ser do tipo date",
      resBodyJson.errors
    );
  });
}

export function alterarColaboradorInexistente() {
  describe("Altera colaborador que não existe", (t) => {
    const endpoint = `${baseUrl}/colaborador/update/`;

    const res = makeRequest("PUT", endpoint, colaboradorPUTInexistente, token);

    checkStatus(400, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorInList("Este id de colaborador não existe", resBodyJson.mensagem);
  });
}

export default function testSuite() {
  criarColaborador();
  alterarColaborador();
  alterarColaboradorSemPassarID();
  alterarColaboradorPassandoDataAdmissaoIncorreta();
  alterarColaboradorInexistente();
}
