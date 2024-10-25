import { makeRequest, checkStatus } from "../utils.js/utils.js";
import { describe } from "https://jslib.k6.io/expect/0.0.5/index.js";
import { schemaColaboradorPost } from "../jornada/schema-jornada.js";

const token = `${__ENV.API_TOKEN}`;
const baseUrl = `${__ENV.BASE_URL}`;

var returnAPI;

export function buscarJornada() {
  describe("Buscar jornada", (t) => {
    const endpoint = `${baseUrl}/jornadas/?limit=1/`;
    const res = makeRequest("get", endpoint, null, token);
    returnAPI = res;

    checkStatus(200, res.status);

    const responseBody = JSON.parse(res.body);
  });
}

function validateSchemaColaboradorGet() {
  describe("Validação do esquema retornado da API com o modelo pre-definido em colaborador-schema.js", (t) => {
    t.expect(returnAPI)
      .toHaveValidJson()
      .and(returnAPI.json())
      .toMatchAPISchema(schemaColaboradorPost);
  });
}

export default function testSuite() {
  buscarJornada();
  validateSchemaColaboradorGet();
}
