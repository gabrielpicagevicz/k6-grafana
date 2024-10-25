import http from "k6/http";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";

export function makeRequest(method, endpoint, payload, token) {
  const jsonPayload = JSON.stringify(payload);
  const options = {
    headers: {
      "Content-Type": "application/json",
      "api-easy-token": token,
    },
  };

  switch (method.toLowerCase()) {
    case "get":
      return http.get(endpoint, options);
    case "post":
      return http.post(endpoint, jsonPayload, options);
    case "put":
      return http.put(endpoint, jsonPayload, options);
    case "del":
      return http.del(endpoint, null, options);

    default:
      throw new Error(`Método ${method} não suportado`);
  }
}

export function checkStatus(expectedStatus, actualStatus) {
  // Alterado o nome do parâmetro
  if (actualStatus === expectedStatus) {
    expect(
      actualStatus,
      `O status code esperado é ${expectedStatus}. O status code retornado foi ${actualStatus}`
    ).to.equal(expectedStatus);
  } else {
    expect(
      actualStatus,
      `O status code esperado é ${expectedStatus}. Entretanto, o status code retornado foi: ${actualStatus}`
    ).to.equal(expectedStatus);
  }
}

export function checkErrorMessage(expectedMessage, actualMessage) {
  if (actualMessage === expectedMessage) {
    expect(
      actualMessage,
      `A mensagem de erro esperada é "${expectedMessage}". A mensagem retornada foi "${actualMessage}".`
    ).to.equal(expectedMessage);
  } else {
    expect(
      actualMessage,
      `A mensagem de erro esperada é "${expectedMessage}". Entretanto, a mensagem retornada foi: "${actualMessage}".`
    ).to.equal(expectedMessage);
  }
}

export function checkErrorInList(expectedError, actualErrorsList) {
  if (actualErrorsList.includes(expectedError)) {
    expect(
      actualErrorsList,
      `A lista de erros contém o erro esperado: "${expectedError}".`
    ).to.include(expectedError);
  } else {
    expect(
      actualErrorsList,
      `A lista de erros deveria conter o erro esperado: "${expectedError}", mas não contém.`
    ).to.include(expectedError);
  }
}

export function makeRequestSemHeader(method, endpoint, payload, token) {
  const jsonPayload = JSON.stringify(payload);
  const options = {};

  switch (method.toLowerCase()) {
    case "post":
      return http.post(endpoint, jsonPayload, options);
    case "put":
      return http.put(endpoint, jsonPayload, options);
    default:
    // throw new Error(Método ${method} não suportado);
  }
}
