import {
  colaborador,
  criarColaboradorOpcionaisPreenchidosNulo as opcoesNulas,
  colaboradorCPFInvalido as colaboradorCpfErrado,
  colaboradorResponsavelCPFOmitido,
  criarColaboradorOmitindoCNPJCPF as cnpjcpffaltando,
  criarColaboradorOmitindoNome as nomefaltando,
  criarColaboradorOmitindoCPF as cpffaltando,
  criarColaboradorOmitindoCodigoMunicipio as codigoMunicipioFaltando,
  criarColaboradorOmitindoCodigoJornada as codigoJornadafaltando,
  criarColaboradorOmitindoCodigoDaFuncao as codigofuncaofaltando,
  criarColaboradorOmitindoCodigoDepartamento as codigoDepartamentofaltando,
  criarColaboradorOmitindoDataAdmissao as dataAdmissaofaltando,
} from "./postColaborador.js";
import {
  makeRequest,
  checkStatus,
  checkErrorInList,
  checkErrorMessage,
  makeRequestSemHeader,
} from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemaColaboradorPost } from "../colaborador/colaborador-schema.js";

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
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, colaborador, token);

    returnAPI = res;
    checkStatus(201, res.status);
  });
}

export function verificaTokenInvalido() {
  describe("Enviando request tokens inválido", (t) => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, colaborador, "token_inexistente");

    const resBodyJson = JSON.parse(res.body);
    checkStatus(403, res.status);
    checkErrorMessage("Token inválido", resBodyJson.mensagem);
  });
}

export function verificaTokenSemHeader() {
  describe("Enviando request sem header", (t) => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequestSemHeader("POST", endpoint, colaborador, token);

    // Parseia o corpo da resposta
    const resBodyJson = JSON.parse(res.body);
    checkStatus(401, res.status);
    checkErrorMessage("Token inválido", resBodyJson.mensagem);
  });
}

export function verificaReqEndPointInexistente() {
  describe("Enviando request em um endpoint que não existe", (t) => {
    const endpoint = `${baseUrl}/colaborador/createsssssssssssssssssssssss`;
    const res = makeRequest("POST", endpoint, colaborador, token);

    checkStatus(404, res.status);
  });
}

function validateSchemaColaborador() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em colaborador-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemaColaboradorPost);
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
  describe("Criação de colaborador com campo responsavel_cpf faltando", () => {
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
  describe("Criação de colaborador com campo cpfcnpj faltando", () => {
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
  describe("Criação de colaborador com campo codigo_municipio faltando", () => {
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
  describe("Criação de colaborador com campo codigo_jornada faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, codigoJornadafaltando, token);

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O código", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCodigoDaFuncao() {
  describe("Criação de colaborador com campo codigo_funcao faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, codigofuncaofaltando, token);

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("O código da função é obrigatório", resBodyJson.errors);
  });
}

export function criarColaboradorOmitindoCodigoDepartamento() {
  describe("Criação de colaborador com campo codigo_departamento faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest(
      "POST",
      endpoint,
      codigoDepartamentofaltando,
      token
    );

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList(
      "O código do departamento é obrigatório",
      resBodyJson.errors
    );
  });
}

export function criarColaboradorOmitindoDataAdmissao() {
  describe("Criação de colaborador com campo data_admissao faltando", () => {
    const endpoint = `${baseUrl}/colaborador/create`;
    const res = makeRequest("POST", endpoint, dataAdmissaofaltando, token);

    checkStatus(400, res.status);

    const resBodyJson = JSON.parse(res.body);

    checkStatus("400", resBodyJson.status_code);
    checkErrorMessage("Dados inválidos", resBodyJson.mensagem);
    checkErrorInList("A data de admissão é obrigatória", resBodyJson.errors);
  });
}

export default function testSuite() {
  criarColaborador();
  validateSchemaColaborador();
  verificaTokenInvalido();
  verificaReqEndPointInexistente();
  criarColaboradorComOpcoesNulas();
  criarColaboradorComCPFInvalido();
  criarColaboradorOmitindoCPFResponsavel();
  criarColaboradorOmitindoCNPJCPF();
  criarColaboradorOmitindoNome();
  criarColaboradorOmitindoCPF();
  criarColaboradorOmitindoCodigoMunicipio();
  criarColaboradorOmitindoCodigoDaFuncao();
  criarColaboradorOmitindoCodigoDepartamento();
  criarColaboradorOmitindoDataAdmissao();
}
