import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        // Aquecimento
        { duration: '30s', target: 100 }, // Aumenta para 100 VUs em 30 segundos

        // Pico
        { duration: '1m', target: 2000 }, // Aumenta para 2000 VUs em 1 minuto
        { duration: '10s', target: 2000 }, // Mantém 2000 VUs por 10 segundos
        { duration: '1m', target: 100 }, // Reduz para 100 VUs em 1 minuto
        { duration: '2m', target: 500 }, // Aumenta para 500 VUs em 2 minutos

        // Resfriamento
        { duration: '30s', target: 0 }, // Diminui para 0 VUs em 30 segundos
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% das requisições devem ter duração abaixo de 200 ms
    },
};

export default function () {
    const response = http.get('https://pokeapi.co/api/v2/pokemon');
    
    check(response, {
        'status é 200': (r) => r.status === 200,
    });
}