import http from "k6/http";
import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";

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
