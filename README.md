## Descrição do Projeto

Este projeto tem como objetivo realizar testes de carga e validação de uma API de Pokémon. Ele utiliza o k6 para simular requisições e analisar o desempenho da API sob diferentes condições. Os testes garantem que a API esteja retornando os dados corretos e que as respostas estejam de acordo com o esperado, incluindo a validação de status code e estrutura de dados.

### Funcionalidades Principais

- **Teste de Carga**: Simula múltiplas requisições para verificar como a API se comporta sob carga e para identificar possíveis gargalos de desempenho.
- **Validação de Respostas da API**: Realiza requisições para os endpoints da API e verifica:
  - **Código de Status**: Assegura que a API retorna códigos de status apropriados (ex: 200 para sucesso).
  - **Estrutura de Dados**: Utiliza JSON Schema para validar a estrutura dos dados retornados pela API, garantindo que estejam conforme o esperado.
  - **Parâmetros Válidos e Inválidos**: Testa a API com parâmetros válidos e inválidos para verificar se ela se comporta corretamente em ambos os casos, incluindo a verificação de respostas de erro.

### Exemplos de Testes Implementados

Os testes implementados incluem a listagem de Pokémon, validação da resposta da API e testes com parâmetros diferentes. Por exemplo:

- **Listar Todos os Pokémon**:
  Realiza uma requisição GET para listar todos os Pokémon e verifica se o código de status retornado é 200.

- **Validação do Esquema**:
  Faz uma requisição GET e valida se a resposta está em conformidade com o esquema predefinido em `schema.js`.

- **Testes com Parâmetros**:
  Executa testes para verificar se o endpoint retorna a quantidade correta de Pokémon ao utilizar parâmetros de limite e offset.

- **Validação de Erros**:
  Testa respostas de erro ao fornecer limites e offsets inválidos e verifica se a API lida corretamente com URLs inválidas.

## Estrutura do Projeto

- `.github/workflows`: Diretório que contém os arquivos de configuração dos workflows do GitHub Actions. Os workflows automatizam tarefas como testes, builds e deploys.
  - `.test-workflow.yml`: Arquivo de configuração de um workflow específico para a automação de testes da API Pokémon. Este arquivo define as etapas que devem ser executadas sempre que há um push na branch `master`, incluindo a instalação de dependências, configuração do ambiente e execução dos testes de performance usando o k6.
- `k6-grafana-automacao-api-pokemon`: Contém scripts de testes automatizados, cenários de testes e utilitários..
  - `api-pokemon/`: Contém scripts de testes automatizados, cenários de testes e utilitários..
    - `getPokemon.js`: O código realiza testes de API para a listagem de Pokémon, incluindo validação de respostas e parâmetros..
    - `utils.js`: Fornece funções utilitárias para realizar requisições HTTP e validar respostas em testes de carga com k6, facilitando a automação de testes de API.
    - `schema.js`: Contém o json-schema do retorno dos end-points para validar se as respostas estão retornando corretamente.
- `dashboards/`: Contém arquivos de configuração de dashboards do Grafana.
  - `k6-load-testing-results_rev3.json`: Pre-configured Grafana dashboard for visualizing k6 results.
- `docker-compose.yml`: Define os serviços (k6, InfluxDB, Grafana) e suas configurações.
- `grafana-dashboard.yaml`: Configuração de dashoboard do painel.
- `grafana-datasource.yaml`: Configuração da fonte de dados do InfluxDB para o Grafana.
- `run-load-test.ps1`: Configuração que inicia os serviços `influxdb` e `grafana` definidos no arquivo `docker-compose.yml`.
- `run.sh`: Script para iniciar facilmente o teste de carga e os serviços.

## Opções de Execução do Projeto

Este projeto oferece duas opções para executar os testes:

<details>
  <summary><strong>Executar no Terminal do VSCode</strong></summary>
Esta opção permite que você execute os testes diretamente no terminal do VSCode, sem a necessidade de subir o ambiente Docker.

### Pré-requisitos

1. **K6**: Certifique-se de que o K6 está instalado na sua máquina.

   - ([Instalar K6](https://dl.k6.io/msi/k6-latest-amd64.msi)) - Importante reiniciar a máquina após a instalação.

2. **Node.js**
   ([Instalar Node.js](https://nodejs.org/pt-br))

Siga os passos abaixo para rodar executar o projeto:

1. Clone o repositório:

   ```bash
   git clone https://github.com/gabrielpicagevicz/k6-grafana
   ```

2. Instale as dependências necessárias (se houver).

### Escolha como executar os testes

Você pode executar os testes de duas maneiras: individualmente ou em paralelo.

1. **Executar os testes individualmente**:

   - Utilize o seguinte comando:
     ```bash
     npm run exec-get-pokemons
     ```

2. **Executar todos os cenários em paralelo**:
   - Para executar todos os testes simultaneamente, utilize o comando abaixo. Este comando executará todos os testes que estão mapeados em `"scripts": {}` no `package.json`:
   `bash
     npm run exec-paralelo
     `
   </details>

<details>
  <summary><strong>Executar com docker e visualização do Grafana</strong></summary>
Esta opção permite que você suba o projeto em um ambiente Docker, utilizando o Grafana e o InfluxDB para coletar e visualizar os resultados dos testes de carga.

### Pré-requisitos

1. **Docker**: Certifique-se de que o Docker está instalado na sua máquina.
   - [Instalar Docker](https://docs.docker.com/get-docker/)

### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/gabrielpicagevicz/k6-grafana
   ```

   Na sequência, acesse a pasta `.\k6-grafana-automacao-api-pokemon\ `

   ```bash
   cd .\k6-grafana-automacao-api-pokemon\
   ```

2. **Suba os serviços do InfluxDB e Grafana**:

   Execute o comando abaixo para iniciar os contêineres do InfluxDB e Grafana em segundo plano:

   ```bash
   docker-compose up -d influxdb grafana
   ```

3. **Execute os testes com o k6 grafana**:

   - Utilize o seguinte comando:

   ```bash
   docker-compose run k6 run /scripts/getPokemon.js
   ```

```bash
   em breve será possível executar paralelamente
```

1. **Acesse o Grafana**:

   Após a execução do teste, você pode visualizar os resultados no Grafana:

   - URL do Grafana: [http://localhost:3000/](http://localhost:3000/)
   </details>

<details>
  <summary><strong>Teste de Carga (Load Testing)</strong></summary>

Antes de implementar um teste de carga, devemos nos perguntar: o que significa desempenho no contexto de uma API? Isso influencia o tipo de teste que você deve implementar e pode significar que nem todos os cenários são necessários.

O **Teste de Carga (Load Testing)** avalia como um sistema se comporta sob uma carga esperada. O objetivo é garantir que a aplicação funcione corretamente quando várias solicitações são feitas simultaneamente.

É importante definir o tráfego normal da API e um tempo de resposta aceitável, pois você pode escrever cenários de teste para verificar se a API atende a esses critérios. Por exemplo, você pode testar com 10 usuários virtuais e verificar se as respostas estão abaixo de 200 milissegundos, executando esse teste por 5 minutos. Esse teste fornecerá uma indicação inicial de como sua API se comporta em condições normais.

### Exemplo de Teste de Carga (Load Testing)

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // Número de usuários virtuais
  duration: "5m", // Duração do teste
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% das requisições devem ter duração abaixo de 200 milissegundos
  },
};

export default function () {
  const response = http.get("https://pokeapi.co/api/v2/pokemon");

  // Verifica se a resposta tem status 200
  check(response, {
    "status é 200": (r) => r.status === 200,
    "duração das respostas <= 200ms": (r) => r.timings.duration <= 200,
  });
  sleep(1); // Pausa de 1 segundo entre as requisições
}
```

Em uma aplicação real, pode haver momentos em que a aplicação recebe mais solicitações do que o normal, e você deseja saber como sua API se comportará nesse cenário. Você pode aumentar gradualmente a carga em sua API até determinados níveis e observar como o sistema responde. Para isso, você pode utilizar o conceito de estágios.

</details>

<details>
  <summary><strong>Teste de Estresse (Stress Testing)</strong></summary>

Neste tipo de teste, você deseja levar a API a um determinado nível para observar o que acontece. Pode ser necessário aumentar o tempo de resposta esperado ou até mesmo a porcentagem de respostas bem-sucedidas esperadas. A premissa é que, quando sua API está sob intenso estresse, o desempenho tende a se degradar. Portanto, o que você deseja avaliar é se o desempenho continua sendo aceitável sob essas condições extremas.

### Exemplo de Código

```javascript
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
  const response = http.get("https://test.k6.io/");

  // Verifica se a resposta tem status 200
  check(response, {
    "status é 200": (r) => r.status === 200,
  });
}
```

</details>


<details>
  <summary><strong>Spike Testing (Teste de Pico)</strong></summary>

Vamos imaginar que você está construindo uma API para uma plataforma de venda de ingressos para shows. Durante eventos muito populares, você geralmente recebe volumes extremamente altos de solicitações em um curto período, seguido de uma queda abrupta nas requisições, uma vez que os ingressos se esgotam. Nesse cenário, o conceito de tráfego normal não se aplica, tornando inadequados tanto o teste de carga quanto o teste de estresse com uma aceleração lenta. O que você realmente precisa é de um **spike test**.

### O que é Spike Testing?

O spike test envolve começar com um número muito baixo de usuários virtuais e, em seguida, aumentar drasticamente esse número em um curto espaço de tempo. Após sustentar essa carga alta, você deve diminuir o número de VUs para simular o fim do pico.

### Exemplo de Código

```javascript
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
    const response = http.get('https://test.k6.io/'); // Substitua pela URL da sua API

    // Verifica se a resposta tem status 200
    check(response, {
        'status é 200': (r) => r.status === 200,
    });
}
```

</details>

<details>
  <summary><strong>Soak Testing (Teste de Duração ou Teste de Resistência)</strong></summary>

O **Soak Testing** é fundamental para detectar problemas que não aparecem em testes mais curtos. Por exemplo, se houver um vazamento de memória, o desempenho da sua API pode se degradar lentamente ao longo do tempo, e um teste de apenas alguns minutos não será suficiente para identificá-lo.

### Objetivo do Soak Testing

Esse tipo de teste deve ser executado por várias horas para garantir que sua API mantenha um tempo de resposta estável e um uso eficiente de recursos. Além de analisar os logs do k6 ao final do teste, é importante coletar métricas como uso de memória e uso de CPU. Isso proporciona uma visão clara de como sua API se comporta ao longo do tempo, permitindo identificar pontos fracos e áreas onde o sistema pode apresentar gargalos de desempenho. Esse cenário é especialmente relevante em arquiteturas de microserviços.

### Exemplo de Código

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

// Definindo a quantidade de usuários virtuais e a duração do teste
export const options = {
    vus: 10, // Número de usuários virtuais
    duration: '1h', // Duração total do teste
};

export default function () {
    // Fazendo uma requisição para a API
    const res = http.get('https://api.exemplo.com/endpoint'); // Substitua pela URL da sua API

    // Verificando o status da resposta
    if (res.status !== 200) {
        console.error(`Erro: ${res.status}`);
    }

    // Pausa entre as requisições
    sleep(1); // Pausa de 1 segundo entre as requisições
}

```

</details>