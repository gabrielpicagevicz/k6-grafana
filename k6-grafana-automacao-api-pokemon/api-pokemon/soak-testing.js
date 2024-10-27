import http from 'k6/http';
import { sleep } from 'k6';

// Definindo a quantidade de usuários virtuais e a duração do teste
export const options = {
    vus: 10, // Número de usuários virtuais
    duration: '1h', // Duração total do teste
};

export default function () {
    const res = http.get('https://pokeapi.co/api/v2/pokemon')

    // Verificando o status da resposta
    if (res.status !== 200) {
        console.error(`Erro: ${res.status}`);
    }
    sleep(1); 
}