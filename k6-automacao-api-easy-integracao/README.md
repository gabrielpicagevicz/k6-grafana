
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
  <summary><strong>Executar Localmente - Sem visualização Grafana</strong></summary>

  ### Pré-requisitos

1. **K6**: Certifique-se de que o K6 está instalado na sua máquina.
   - ([Instalar K6](https://dl.k6.io/msi/k6-latest-amd64.msi)) - Importante reiniciar a máquina após a instalação.
  
2. **Node.js**
    ([Instalar Node.js](https://nodejs.org/pt-br))

  Siga os passos abaixo para rodar executar o projeto:

  1. Clone o repositório:
     ```bash
     git clone <https://github.com/gabrielpicagevicz/k6-automacao-api-easy-integracao.git>
     ```

  2. Instale as dependências necessárias (se houver).

# Escolha como executar os testes

Você tem duas opções para executar os testes:

1. **Executar os testes individualmente**:
   - Se você deseja testar um endpoint específico (por exemplo, o GET do endpoint do colaborador), utilize o seguinte comando:
    - **Exemplo**: Para testar o GET do endpoint do colaborador, o comando seria:
     ```bash
     npm run exec-colaborador-get
     ```

2. **Executar todos os cenários em paralelo**:
   - Para executar todos os testes simultaneamente, utilize o comando abaixo. Este comando executará todos os testes que estão mapeados em `"scripts": {}` no `package.json`:
     ```bash
     npm run exec-paralelo
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
   git clone <https://github.com/gabrielpicagevicz/k6-automacao-api-easy-integracao.git>
   ```
   
   Na sequência, troque acesse a pasta `k6-automacao-api-easy-integracao/` 
    ```bash
   cd .\k6-automacao-api-easy-integracao\ 
   ```

2. **Suba os serviços do InfluxDB e Grafana**:

   Execute o comando abaixo para iniciar os contêineres do InfluxDB e Grafana em segundo plano (background):

   ```bash
   docker-compose up -d influxdb grafana
   ```

3. **Execute os testes com o k6 grafana**:
   - Se você deseja testar um endpoint específico (por exemplo, o POST do endpoint do colaborador), utilize o seguinte comando:

   ```bash
   docker-compose run k6 run /scripts/easy-integracao/colaborador/colaborador-post.js
   ```

**Executar todos os cenários em paralelo pelo docker ainda nao esta configurado**:
   
3. **Acesse o Grafana**:

   Após a execução do teste, você pode visualizar os resultados no Grafana:

   - URL do Grafana: [http://localhost:3000/](http://localhost:3000/)

4. **Configure o InfluxDB como fonte de dados no Grafana**:

   Acesse o Grafana, vá até as configurações e adicione o InfluxDB como fonte de dados:

   (AINDA NAO ESTA CONFIGURADO)- URL do InfluxDB: [http://localhost:8888/](http://localhost:8888/)

5. **Visualize o Dashboard**:

    (AINDA NAO ESTA CONFIGURADO) Importe o dashboard localizado na pasta `/dashboards` do projeto para o Grafana e comece a visualizar os resultados do teste.
