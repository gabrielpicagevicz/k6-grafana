import { makeRequest, checkStatus } from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemaColaboradorGet } from "../colaborador/colaborador-schema.js";
import { check } from "k6";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

var returnAPI;

var cpfcnpj,
  id_colaborador,
  cpf_colaborador,
  codigo_departamento,
  codigo_funcao,
  codigo_jornada,
  codigo_municipio;

export function buscarColaborador() {
  describe("Buscar colaboradores sem filtro", (t) => {
    const endpoint = `${baseUrl}/colaborador/`;
    const res = makeRequest("get", endpoint, null, token);
    returnAPI = res;

    checkStatus(200, res.status);

    // Acessar o JSON retornado e pega os valores para ser usado como filtro nos próximos testes.
    const responseBody = JSON.parse(res.body);
    cpfcnpj = responseBody.dados[0].cpfcnpj;
    id_colaborador = responseBody.dados[0].id_colaborador;
    cpf_colaborador = responseBody.dados[0].cpf_colaborador;
    codigo_departamento = responseBody.dados[0].codigo_departamento;
    codigo_funcao = responseBody.dados[0].codigo_funcao;
    codigo_jornada = responseBody.dados[0].codigo_jornada;
    codigo_municipio = responseBody.dados[0].codigo_municipio;
  });
}

export function buscarColaboradorFiltroInexistente() {
  describe("Buscar colaboradores com filtro inexistente", (t) => {
    const endpoint = `${baseUrl}/colaborador/?filtronaoexiste=1`;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(400, res.status);
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
    const responseBody = JSON.parse(res.body);
    const dataDemissao = responseBody.dados[0].data_demissao;
    check(responseBody, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo data_demissao não é nulo": (r) => dataDemissao !== null,
    });
  });
}

export function buscarColaboradorFiltroDemissaoFalse() {
  describe("Teste dos filtros - Busca colaborador com filtro demissao false", (t) => {
    const endpoint = `${baseUrl}/colaborador?demitidos=` + false;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
    const responseBody = JSON.parse(res.body);
    const dataDemissao = responseBody.dados[0].data_demissao;
    check(responseBody, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo data_demissao é nulo": (r) => dataDemissao === null,
    });
  });
}

export function buscarColaboradorFiltroCpfcnpj() {
  describe("Teste dos filtros - Busca colaborador com filtro cpfcnpj", (t) => {
    const endpoint = `${baseUrl}/colaborador?cpfcnpj=` + cpfcnpj;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);

    const responseBodycpfcnpj = JSON.parse(res.body);

    var cpfcnpjAtual = responseBodycpfcnpj.dados[0].cpfcnpj;

    check(responseBodycpfcnpj, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo cpfcnpj é igual o cpfcnpj retornado anteriormente": (r) =>
        cpfcnpjAtual === cpfcnpj,
    });
  });
}

export function buscarColaboradorFiltroIDColaborador() {
  describe("Teste dos filtros - Busca colaborador com filtro idColaborador", (t) => {
    const endpoint = `${baseUrl}/colaborador?=id_colaborador=` + id_colaborador;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);
    const responseBodyId_colaborador = JSON.parse(res.body);
    var id_colaboradorAtual =
      responseBodyId_colaborador.dados[0].id_colaborador;

    check(responseBodyId_colaborador, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo id_colaborador é igual o id_colabordor retornado anteriormente":
        (r) => id_colaboradorAtual === id_colaborador,
    });
  });
}

export function buscarColaboradorFiltroCpf_colaborador() {
  describe("Teste dos filtros - Busca colaborador com filtro cpf_colaborador", (t) => {
    const endpoint =
      `${baseUrl}/colaborador?=cpf_colaborador=` + cpf_colaborador;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);

    const responseBodycpf_colaborador = JSON.parse(res.body);
    var cpf_colaboradorAtual =
      responseBodycpf_colaborador.dados[0].cpf_colaborador;

    check(responseBodycpf_colaborador, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo cpf_colaborador é igual o cpf_colaborador retornado anteriormente":
        (r) => cpf_colaboradorAtual === cpf_colaborador,
    });
  });
}

export function buscarColaboradorFiltroCodigo_departamento() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_departamento", (t) => {
    const endpoint =
      `${baseUrl}/colaborador?=codigo_departamento` + codigo_departamento;
    const res = makeRequest("get", endpoint, null, token);
    checkStatus(200, res.status);

    const responseBodycodigo_departamento = JSON.parse(res.body);

    var codigo_departamentoAtual =
      responseBodycodigo_departamento.dados[0].codigo_departamento;

    check(responseBodycodigo_departamento, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo codigo_departamento é igual o codigo_departamento retornado anteriormente":
        (r) => codigo_departamentoAtual === codigo_departamento,
    });
  });
}

export function buscarColaboradorFiltroCodigo_funcao() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_funcao", (t) => {
    const endpoint = `${baseUrl}/colaborador?=codigo_funcao` + codigo_funcao;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);

    const responseBodycodigo_funcao = JSON.parse(res.body);

    var codigo_funcaoAtual = responseBodycodigo_funcao.dados[0].codigo_funcao;

    check(responseBodycodigo_funcao, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo codigo_funcao é igual o codigo_funcao retornado anteriormente": (
        r
      ) => codigo_funcaoAtual === codigo_funcao,
    });
  });
}

export function buscarColaboradorFiltrocodigo_jornada() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_jornada", (t) => {
    const endpoint = `${baseUrl}/colaborador?=codigo_jornada` + codigo_jornada;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);

    const responseBodycodigo_jornada = JSON.parse(res.body);

    var codigo_jornadaAtual =
      responseBodycodigo_jornada.dados[0].codigo_jornada;

    check(responseBodycodigo_jornada, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo codigo_jornada é igual o codigo_jornada retornado anteriormente":
        (r) => codigo_jornadaAtual === codigo_jornada,
    });
  });
}

export function buscarColaboradorFiltrocodigo_municipio() {
  describe("Teste dos filtros - Busca colaborador com filtro codigo_municipio", (t) => {
    const endpoint =
      `${baseUrl}/colaborador?=codigo_municipio` + codigo_municipio;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);

    const responseBodycodigo_municipio = JSON.parse(res.body);

    var codigo_municipioAtual =
      responseBodycodigo_municipio.dados[0].codigo_municipio;

    check(responseBodycodigo_municipio, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo codigo_municipio é igual o codigo_municipio retornado anteriormente":
        (r) => codigo_municipioAtual === codigo_municipio,
    });
  });
}

export function buscarColaboradorFiltroAttributes() {
  describe("Teste dos filtros - Busca colaborador com filtro attributes + id_colaborador", (t) => {
    const endpoint = `${baseUrl}/colaborador?attributes=` + "id_colaborador";
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);

    const responseBodyAttrID_colaborador = JSON.parse(res.body);

    var attrid_colaborador =
      responseBodyAttrID_colaborador.dados[0].id_colaborador;

    check(responseBodyAttrID_colaborador, {
      "A resposta contém registros": (r) => r.dados.length > 0,
      "O campo filtro atributo é igual ao id_colaborador retornado anteriormente":
        (r) => attrid_colaborador === id_colaborador,
    });
  });
}

export function buscarColaboradorFiltroOrdem() {
  describe("Teste dos filtros - Busca colaborador com filtro order", (t) => {
    const endpoint = `${baseUrl}/colaborador?=order=cpf`;
    const res = makeRequest("get", endpoint, null, token);

    checkStatus(200, res.status);
  });
}

export default function testSuite() {
  buscarColaborador();
  buscarColaboradorFiltroInexistente();
  validateSchemaColaboradorGet();
  buscarColaboradorFiltroLimit();
  buscarColaboradorFiltroDemissaoTrue();
  buscarColaboradorFiltroDemissaoFalse();
  buscarColaboradorFiltroCpfcnpj();
  buscarColaboradorFiltroIDColaborador();
  buscarColaboradorFiltroCpf_colaborador();
  buscarColaboradorFiltroCodigo_departamento();
  buscarColaboradorFiltroCodigo_funcao();
  buscarColaboradorFiltrocodigo_jornada();
  buscarColaboradorFiltrocodigo_municipio();
  buscarColaboradorFiltroOrdem();
  buscarColaboradorFiltroAttributes();
}
