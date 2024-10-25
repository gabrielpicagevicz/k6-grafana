import { makeRequest, checkStatus } from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemaDepartamentoGET } from "../departamento/departamento-schema.js";
import { check } from "k6";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

var returnAPI;
var codigo_departamento;

export function buscarDepartamento() {
  describe("Buscar departamento sem filtro", (t) => {
    const endpoint = `${baseUrl}/departamento/`;
    const res = makeRequest("get", endpoint, null, token);
    returnAPI = res;

    checkStatus(200, res.status);
    const responseBody = JSON.parse(res.body);

    codigo_departamento = responseBody.dados[0].codigo_departamento;
  });
}

function validateSchemaColaboradorGet() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em colaborador-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemaDepartamentoGET);
  });
}

export function buscarDepartamentoCodigo_Departamento() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_departamento", (t) => {
    var limit = 1;
    const endpoint = `${baseUrl}/departamento?limit=` + codigo_departamento;
    const res = makeRequest("get", endpoint, null, token);
    const resBodyJson = JSON.parse(res.body);
    checkStatus(200, res.status);

    t.expect(resBodyJson.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Registros encontrados:");

    t.expect(resBodyJson.dados.length)
      .as("Validando a quantidade de dados dentro do json retornado")
      .toBeGreaterThan(0);

    t.expect(resBodyJson.dados[0].codigo_departamento)
      .as("Validando o codigo_departamento")
      .toEqual(codigo_departamento);
  });
}

export function buscarDepartamentoFiltroInexistente() {
  describe("Buscar Departamento com filtro inexistente", (t) => {
    const endpoint = `${baseUrl}/departamento/?filtronaoexiste=1`;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(400, res.status);
  });
}

export function buscarDepartamentorFiltroLimit() {
  describe("Teste dos filtros - Busca Departamento com filtro limit", (t) => {
    var limit = 1;
    const endpoint = `${baseUrl}/departamento?limit=` + limit;
    const res = makeRequest("get", endpoint, null, token);
    const resBodyJson = JSON.parse(res.body);
    checkStatus(200, res.status);

    t.expect(resBodyJson.quantidade_registros)
      .as(
        "Espera-se que a quantidade de registro seja igual o valor definido no filtro"
      )
      .toEqual(limit);

    t.expect(resBodyJson.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Registros encontrados:");

    t.expect(resBodyJson.dados.length)
      .as("Validando a quantidade de dados dentro do json retornado")
      .toBeGreaterThan(0);
  });
}

export function buscarDepartamentoFiltroAttributes() {
  describe("Teste dos filtros - Busca departamento com filtro attributes + codigo_departamento", (t) => {
    console.log("aaaa" + codigo_departamento);

    const endpoint =
      `${baseUrl}/departamento?attributes=` + "codigo_departamento";

    const res = makeRequest("get", endpoint, null, token);
    console.log("base url" + res.url);
    checkStatus(200, res.status);

    const responseBodyAttrcodigo_departamento = JSON.parse(res.body);

    var attrcodigo_departamento =
      responseBodyAttrcodigo_departamento.dados[0].codigo_departamento;

    check(responseBodyAttrcodigo_departamento, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo filtro atributo é igual ao codigo_departamento retornado anteriormente":
        (r) => attrcodigo_departamento === codigo_departamento,
    });
  });
}

export default function testSuite() {
  buscarDepartamento();
  validateSchemaColaboradorGet();
  buscarDepartamentoCodigo_Departamento();
  buscarDepartamentoFiltroInexistente();
  buscarDepartamentorFiltroLimit();
  buscarDepartamentoFiltroAttributes();
}
