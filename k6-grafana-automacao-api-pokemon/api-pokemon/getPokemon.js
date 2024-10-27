import { makeRequest, checkStatus } from "./utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { pokemonSchema } from "./schema.js";
import { check } from "k6";

const baseUrl = `${__ENV.BASE_URL}`;
const token = `${__ENV.API_TOKEN}`;

export function getPokemon() {
  describe("listar todos os pokemons", (t) => {
    const endpoint = `${baseUrl}/pokemon`;

    const res = makeRequest("get", endpoint, null, null);

    checkStatus(200, res.status);
  });
}

function validateSchemaPokemon() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em pokemon-schema.js", (t) => {
    const returnAPI = makeRequest(
      "get",
      `${baseUrl}pokemon/?limit=1`,
      null,
      null
    );
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(pokemonSchema);
  });
}

function testWithDifferentParameters() {
  describe("Testes com Parâmetros Diferentes", (t) => {
    const limitTest = makeRequest(
      "get",
      `${baseUrl}pokemon/?limit=10`,
      null,
      null
    );
    check(limitTest, {
      "Resposta com limit=10 tem 10 pokémons": (r) =>
        JSON.parse(r.body).results.length === 10,
    });
  });
}

function validateInvalidLimits() {
  describe("Validação de Limites com Valores Inválidos", (t) => {
    const invalidLimit = makeRequest(
      "get",
      `${baseUrl}pokemon/&limit=-10`,
      null,
      null
    );
    check(invalidLimit, {
      "Resposta com limit=-10 é um erro": (r) => r.status >= 400,
    });

    const invalidOffset = makeRequest(
      "get",
      `${baseUrl}pokemon/&offset=-10`,
      null,
      null
    );
    check(invalidOffset, {
      "Resposta com offset=-10 é um erro": (r) => r.status >= 400,
    });
  });
}

function validateInvalidUrls() {
  describe("Validação de URLs Inválidas", (t) => {
    const invalidUrl = makeRequest(
      "get",
      `${baseUrl}pokemon/&offset=999999`,
      null,
      null
    );
    check(invalidUrl, {
      "Resposta com offset=999999 retorna erro 404": (r) => r.status === 404,
    });
  });
}

export default function testSuite() {
  getPokemon();
  validateSchemaPokemon();
  testWithDifferentParameters();
  validateInvalidLimits();
  validateInvalidUrls();
}
