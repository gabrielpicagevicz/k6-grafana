# Documentação dos Cenários de Teste - API de Jornadas (GET)

## 1. Buscar Jornada
### Descrição:
Este teste realiza uma requisição para buscar uma jornada, limitando a resposta a 1 registro, e verifica se o status da resposta está correto.
### Endpoint:
`GET /jornadas/?limit=1`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Armazena a resposta da API em `returnAPI` para futuras validações.

## 2. Validar Schema do Colaborador Retornado
### Descrição:
Este teste valida o schema do JSON de resposta para garantir que o formato dos dados retornados está de acordo com o modelo definido em `colaborador-schema.js`.
### Endpoint:
`GET /jornadas/?limit=1`
### Validações:
- Valida se o JSON de resposta corresponde ao schema `schemaColaboradorPost`.
- Verifica a integridade e estrutura do JSON usando `toHaveValidJson` e `toMatchAPISchema`.
