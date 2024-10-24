import { makeRequest, checkStatus } from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { schemaColaboradorGet } from "../colaborador/colaborador-schema.js";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

var returnAPI;
var empresaCPFCNPJ;
export function buscarColaborador() {
  describe("Buscar colaboradores sem filtro", (t) => {
    const endpoint = `${baseUrl}/colaborador/`;
    const res = makeRequest("get", endpoint, null, token);
    returnAPI = res;

    checkStatus(200, res.status);
  });
}

function validateSchemaColaboradorGet() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em colaborador-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemaColaboradorGet);
  });
}

export function buscarColaboradorFiltroLimit() {
  describe("Teste dos filtros - Busca colaborador com filtro limit", (t) => {
    var limit = 1;
    const endpoint = `${baseUrl}/colaborador?limit=` + limit;
    const res = makeRequest("get", endpoint, null, token);
    const resBodyJson = JSON.parse(res.body);
    checkStatus(200, res.status);

    t.expect(resBodyJson.quantidade_registros)
      .as(
        "Espera-se que a quantidade de registro seja igual o valor definido no filtro"
      )
      .toEqual(limit);

    empresaCPFCNPJ = resBodyJson.dados[0].cpfcnpj; // Armazena o valor na variável global

    t.expect(resBodyJson.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Colaboradores encontrados: ");

    t.expect(resBodyJson.dados.length)
      .as("Validando a quantidade de dados dentro do json retornado")
      .toBeGreaterThan(0);
  });
}

export function buscarColaboradorFiltroDemissaoTrue() {
  describe("Teste dos filtros - Busca colaborador com filtro demissao true", (t) => {
    const endpoint = `${baseUrl}/colaborador?demitidos=` + true;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export function buscarColaboradorFiltroDemissaoFalse() {
  describe("Teste dos filtros - Busca colaborador com filtro demissao false", (t) => {
    const endpoint = `${baseUrl}/colaborador?demitidos=` + false;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export function buscarColaboradorFiltroCpfcnpj() {
  describe("Teste dos filtros - Busca colaborador com filtro id_colaborador", (t) => {
    const endpoint = `${baseUrl}/colaborador?cpfcnpj=` + empresaCPFCNPJ;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export function buscarColaboradorFiltroIDColaborador() {
  describe("Teste dos filtros - Busca colaborador com filtro idColaborador", (t) => {
    const endpoint = `${baseUrl}/colaborador?=id_colaborador=` + 1;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export function buscarColaboradorFiltroCpf_colaborador() {
  describe("Teste dos filtros - Busca colaborador com filtro cpf_colaborador", (t) => {
    const endpoint = `${baseUrl}/colaborador?=cpf_colaborador=` + 1;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export function buscarColaboradorFiltroCodigo_departamento() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_departamento", (t) => {
    const endpoint = `${baseUrl}/colaborador?=codigo_departamento`;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export function buscarColaboradorFiltroCodigo_funcao() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_funcao", (t) => {
    const endpoint = `${baseUrl}/colaborador?=codigo_funcao`;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
  });
}

export default function testSuite() {
  buscarColaborador();
  validateSchemaColaboradorGet();
  buscarColaboradorFiltroLimit();
  buscarColaboradorFiltroDemissaoTrue();
  buscarColaboradorFiltroDemissaoFalse();
  buscarColaboradorFiltroCpfcnpj();
  buscarColaboradorFiltroIDColaborador();
  buscarColaboradorFiltroCpf_colaborador();
  buscarColaboradorFiltroCodigo_departamento();
  buscarColaboradorFiltroCodigo_funcao();
}
