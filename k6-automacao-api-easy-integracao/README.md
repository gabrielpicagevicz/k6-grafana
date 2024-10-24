
## easydots - testes automatizados 

Este repositório foi criado para armazenar os testes automatizados de nossos projetos. 
Atualmente, ele contém testes automatizados de nossa API **easy-integracao**.

Você pode executar o repositório localmente ou via Docker para visualizar as métricas dos testes executados. 
Pois ele sobe uma máquina com o k6, grafana e permite um melhor acompanhamento dos resultados.

## Estrutura do Proejeto

- `docker-compose.yml`: Define os serviços (k6, InfluxDB, Grafana) e suas configurações.
- `dashboard/`: Contém arquivos de configuração de dashboards do Grafana.
- `k6-load-testing-results_rev3.json`: Pre-configured Grafana dashboard for visualizing k6 results.
- `k6-automacao-api-easy-integracao/`: Contém scripts de testes automatizados, cenários de testes para cada end-point e utilitários..
  - `scripts/`: Será atualizado mais pra frente, entretanto é a pasta onde o docker está olhando para executar.
    - `easy-integracao/`: Contém os scripts dos testes automatizados, cenários de testes para cada end-point e utilitários..
      - `colaborador/`: Contém testes automatizados e documentação para os endpoints relacionados ao colaborador, dentre eles cenários de POST, GET, PUT e DELETE..
        - `colaborador-get.js`: Contém testes automatizados para o endpoint GET do colaborador.
        - `colaborador-post.js`: Contém testes automatizados para o endpoint POST do colaborador.
        - `colaborador-schema.js`: Contém o json-schema do retorno dos end-points para validar se as respostas estão retornando corretamente.
        - `postColaborador.js`: Contém métodos objetos para criação de colaboradores com campos variados, omitindo diferentes propriedades para testes.
      - `utils.js/`: Fornece funções utilitárias para realizar requisições HTTP e validar respostas em testes de carga com k6, facilitando a automação de testes de API.
        - `utils.js/`: Script contendo métodos e funções utilizados globalmente em todos os endpoints de forma frequente.
- `dashboard/`: Contains Grafana configuration files and dashboards.
  - `grafana-datasource.yaml`: Configuração da fonte de dados do InfluxDB para o Grafana.
  - `grafana-dashboard.yaml`: Configuração de dashoboard do painel.
- `run.sh`: Script para iniciar facilmente o teste de carga e os serviços. (AINDA NAO DEU TEMPO DE IMPLEMENTAR TUDO)


## Como Executar os Testes Local

<details>
  <summary><strong>Executar Localmente</strong></summary>

  ### Pré-requisitos

1. **K6**: Certifique-se de que o Docker está instalado na sua máquina.
   - ([Instalar K6](https://dl.k6.io/msi/k6-latest-amd64.msi)) - Importante reiniciar a máquina após a instalação.

2. **Docker Compose**: O Docker Compose deve estar instalado.
   - [Instalar Docker Compose](https://docs.docker.com/compose/install/)

  Siga os passos abaixo para rodar o projeto localmente:

  1. Clone o repositório:
     ```bash
     git clone <https://github.com/gabrielpicagevicz/k6-automacao-api-easy-integracao.git>
     ```

  2. Instale as dependências necessárias (se houver).

  3. Execute os testes:
     ```bash
     <comando-para-executar-os-testes>
     ```

</details>



Siga os passos abaixo para rodar o ambiente de testes de carga com Docker, k6, Grafana e InfluxDB:

### Pré-requisitos

1. **Docker**: Certifique-se de que o Docker está instalado na sua máquina.
   - [Instalar Docker](https://docs.docker.com/get-docker/)

2. **Docker Compose**: O Docker Compose deve estar instalado.
   - [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### Passos

1. **Clone o repositório**:

   ```bash
   git clone <URL-do-seu-repositorio>
   cd <nome-do-repositorio>
   ```

2. **Suba os serviços do InfluxDB e Grafana**:

   Execute o comando abaixo para iniciar os contêineres do InfluxDB e Grafana em segundo plano (background):

   ```bash
   docker-compose up -d influxdb grafana
   ```

3. **Execute o teste de carga com o k6**:

   Rode o script de teste utilizando o k6:

   ```bash
   docker-compose run k6 run /scripts/stress-test.js
   ```

4. **Acesse o Grafana**:

   Após a execução do teste, você pode visualizar os resultados no Grafana:

   - URL do Grafana: [http://localhost:3000/](http://localhost:3000/)

5. **Configure o InfluxDB como fonte de dados no Grafana**:

   Acesse o Grafana, vá até as configurações e adicione o InfluxDB como fonte de dados:

   - URL do InfluxDB: [http://localhost:8888/](http://localhost:8888/)

6. **Visualize o Dashboard**:

   Importe o dashboard localizado na pasta `/dashboards` do projeto para o Grafana e comece a visualizar os resultados do teste.
