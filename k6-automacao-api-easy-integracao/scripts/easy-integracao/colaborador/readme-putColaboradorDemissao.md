# Documentação dos Cenários de Teste - API de Colaboradores (Demissão)

## 1. Criar Colaborador
### Descrição:
Este teste cria um colaborador para ser usado no teste de demissão.
### Endpoint:
`POST /colaborador/create`
### Validações:
- Verifica se o status da resposta é 201 (Created).
- Valida a mensagem de sucesso: `"Colaborador cadastrado com sucesso"`.
- Armazena o `id_colaborador` criado para testes subsequentes.

## 2. Demitir Colaborador
### Descrição:
Este teste realiza a demissão do colaborador criado no cenário anterior.
### Endpoint:
`PUT /colaborador/demitir/`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida a mensagem de sucesso: `"Colaborador demitido com sucesso"`.
- Armazena o `id_colaborador` do colaborador demitido.

## 3. Buscar Colaborador Demitido
### Descrição:
Busca o colaborador demitido para verificar o status de demissão.
### Endpoint:
`GET /colaborador/?id_colaborador={id_colaborador}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Confirma que a resposta contém registros.
- Verifica que o campo `data_demissao` não é nulo.

## 4. Demitir Colaborador Já Demitido
### Descrição:
Tenta demitir novamente um colaborador que já está demitido.
### Endpoint:
`PUT /colaborador/demitir/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Valida a mensagem de erro: `"Este colaborador já está demitido"`.

## 5. Demitir Colaborador Inexistente
### Descrição:
Realiza uma tentativa de demissão para um colaborador com `id` inexistente.
### Endpoint:
`PUT /colaborador/demitir/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Valida a mensagem de erro: `"Este id de colaborador não existe"`.

# Documentação dos Cenários de Teste - API de Colaboradores (Demissão)

## 6. Demitir Colaborador com Data Futura
### Descrição:
Este teste verifica se a API bloqueia a demissão de um colaborador com uma data de demissão no futuro.
### Endpoint:
`PUT /colaborador/demitir/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Valida a mensagem de erro: `"A data de demissão não pode ser uma data futura"`.
