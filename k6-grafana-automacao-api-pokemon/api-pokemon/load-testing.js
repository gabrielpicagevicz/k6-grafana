import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // número de usuários virtuais
  duration: "5m", // duração do teste
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% das requisições devem ter duração abaixo de 200 milissegundos
  },
};

export default function () {
  const response = http.get("https://pokeapi.co/api/v2/pokemon");

  // Verifica se a resposta tem status 200
  check(response, {
    "status é 200": (r) => r.status === 200,
    "duracao das respostas <= 200ms": (r) => r.timings.duration <= 200,
  });
  sleep(1); // pausa de 1 segundo entre as requisições
}
