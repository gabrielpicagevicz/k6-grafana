import { makeRequest, checkStatus } from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemaFuncaoGET } from "../funcao/funcao-schema.js";
import { check } from "k6";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

var returnAPI;
var codigo_funcao;

export function buscarFuncao() {
  describe("Buscar uma funcao", (t) => {
    const endpoint = `${baseUrl}/funcao/?limit=1`;
    const res = makeRequest("get", endpoint, null, token);
    returnAPI = res;

    checkStatus(200, res.status);
    const responseBody = JSON.parse(res.body);

    codigo_funcao = responseBody.dados[0].codigo_funcao;
  });
}

function validateSchemaColaboradorGet() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em colaborador-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemaFuncaoGET);
  });
}

export function buscarFuncaoCodigo_funcao() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_funcao", (t) => {
    var limit = 1;
    const endpoint = `${baseUrl}/funcao/?codigo_funcao=` + codigo_funcao;
    const res = makeRequest("get", endpoint, null, token);
    console.log("retorno do servidor" + res);
    const resBodyJson = JSON.parse(res.body);
    checkStatus(200, res.status);

    t.expect(resBodyJson.mensagem)
      .as("Validando mensagem do body")
      .toEqual("Registros encontrados: ");

    t.expect(resBodyJson.dados.length)
      .as("Validando a quantidade de dados dentro do json retornado")
      .toBeGreaterThan(0);

    t.expect(resBodyJson.dados[0].codigo_funcao)
      .as("Validando o codigo_funcao")
      .toEqual(codigo_funcao);
  });
}

export function buscarFuncaoFiltroInexistente() {
  describe("Buscar funcao com filtro inexistente", (t) => {
    const endpoint = `${baseUrl}/funcao/?filtronaoexiste=1`;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(400, res.status);
  });
}

export function buscarFuncaorFiltroLimit() {
  describe("Teste dos filtros - Busca funcao com filtro limit", (t) => {
    var limit = 1;
    const endpoint = `${baseUrl}/funcao?limit=` + limit;
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

export function buscarFuncaoFiltroAttributes() {
  describe("Teste dos filtros - Busca funcao com filtro attributes + codigo_funcao", (t) => {
    const endpoint = `${baseUrl}/funcao?attributes=` + "codigo_funcao";
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);

    const responseBodyAttrcodigo_funcao = JSON.parse(res.body);

    var attrcodigo_funcao =
      responseBodyAttrcodigo_funcao.dados[0].codigo_funcao;

    check(responseBodyAttrcodigo_funcao, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo filtro atributo é igual ao codigo_funcao retornado anteriormente":
        (r) => attrcodigo_funcao === codigo_funcao,
    });
  });
}

export default function testSuite() {
  buscarFuncao();
  validateSchemaColaboradorGet();
  buscarFuncaoCodigo_funcao();
  buscarFuncaoFiltroInexistente();
  buscarFuncaorFiltroLimit();
  buscarFuncaoFiltroAttributes();
}
