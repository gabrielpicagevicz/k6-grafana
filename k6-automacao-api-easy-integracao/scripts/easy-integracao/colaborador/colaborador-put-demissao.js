import {
  colaborador,
  demissaoColaborador,
  demissaoColaboradorFuturo,
} from "./postColaborador.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { check } from "k6";
import {
  makeRequest,
  checkStatus,
  checkErrorMessage,
  checkErrorInList,
} from "../utils.js/utils.js";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

export let options = {
  thresholds: {
    checks: [{ threshold: "rate == 1.00", abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

var id_colaborador, id_colaborador_Demitido;

export function criarColaborador() {
  describe("Primeiro cria um colaborador para usar na demissão", (t) => {
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

export function demiteColaboradorDataFutura() {
  describe("Verifica se é possível demitir colaborador com data no futuro", (t) => {
    const endpoint = `${baseUrl}/colaborador/demitir/`;

    const res = makeRequest("PUT", endpoint, demissaoColaboradorFuturo, token);

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);
    checkErrorInList(
      "A data de demissão não pode ser uma data futura",
      resBodyJson.errors[0]
    );
  });
}

export function demiteColaborador() {
  describe("Demite o colaborador", (t) => {
    demissaoColaborador.id_colaborador = id_colaborador;
    const endpoint = `${baseUrl}/colaborador/demitir/`;

    const res = makeRequest("PUT", endpoint, demissaoColaborador, token);

    checkStatus(200, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorMessage("Colaborador demitido com sucesso", resBodyJson.mensagem);

    id_colaborador_Demitido = resBodyJson.dados.id_colaborador;
  });
}

export function buscarColaborador() {
  describe("Verifica se o colaborador foi demitido", (t) => {
    const endpoint = `${baseUrl}/colaborador/?id_colaborador=` + id_colaborador;
    const res = makeRequest("get", endpoint, null, token);

    const responseBody = JSON.parse(res.body);

    var dataDemissao = responseBody.dados.dataDemissao;
    checkStatus(200, res.status);

    check(responseBody, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo data_demissao não é nulo": (r) => dataDemissao !== null,
    });
  });
}

export function demiteColaboradorJaDemitido() {
  describe("Realiza a tentativa de demitir um colaborador já demitido", (t) => {
    demissaoColaborador.id_colaborador = id_colaborador_Demitido;
    const endpoint = `${baseUrl}/colaborador/demitir/`;

    const res = makeRequest("PUT", endpoint, demissaoColaborador, token);

    checkStatus(400, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorMessage(
      "Este colaborador já está demitido",
      resBodyJson.mensagem
    );
  });
}

export function demiteColaboradorInexistente() {
  describe("Demitindo colaborador inexistente", (t) => {
    demissaoColaborador.id_colaborador = "99999999";
    const endpoint = `${baseUrl}/colaborador/demitir/`;

    const res = makeRequest("PUT", endpoint, demissaoColaborador, token);

    checkStatus(400, res.status);
    const resBodyJson = JSON.parse(res.body);
    checkErrorMessage(
      "Este id de colaborador não existe",
      resBodyJson.mensagem
    );
  });
}

export default function testSuite() {
  criarColaborador();
  demiteColaboradorDataFutura();
  demiteColaborador();
  buscarColaborador();
  demiteColaboradorJaDemitido();
  demiteColaboradorInexistente();
}
