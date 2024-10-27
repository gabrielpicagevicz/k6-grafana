import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    // Nível 1
    { duration: "1m", target: 100 }, // Aumenta gradualmente o número de VUs para 100 ao longo de 1 minuto.
    { duration: "2m", target: 100 }, // Mantém 100 VUs estáveis por 2 minutos.

    // Nível 2
    { duration: "1m", target: 200 }, // Aumenta gradualmente o número de VUs para 200 ao longo de 1 minuto.
    { duration: "2m", target: 200 }, // Mantém 200 VUs estáveis por 2 minutos.

    // Nível 3
    { duration: "1m", target: 500 }, // Aumenta gradualmente o número de VUs para 500 ao longo de 1 minuto.
    { duration: "2m", target: 500 }, // Mantém 500 VUs estáveis por 2 minutos.

    // Redução
    { duration: "1m", target: 0 }, // Diminui o número de VUs para 0 ao longo de 1 minuto, permitindo que o sistema retorne a um estado normal após o teste.
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% das requisições devem ter duração abaixo de 200 ms
  },
};

export default function () {
  const response = http.get("https://pokeapi.co/api/v2/pokemon");

  // Verifica se a resposta tem status 200
  check(response, {
    "status é 200": (r) => r.status === 200,
  });
}
