# Documentação dos Cenários de Teste - API de Departamentos (POST)

## 1. Verificar Token Inválido
### Descrição:
Este teste valida a resposta da API ao enviar um token inválido.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 403 (Forbidden).
- Valida se a mensagem de erro retornada é "Token inválido".

## 2. Verificar Token Ausente no Header
### Descrição:
Este teste verifica a resposta da API quando uma requisição é enviada sem o token no header.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 401 (Unauthorized).
- Valida se a mensagem de erro retornada é "Token não foi informado".

## 3. Verificar Endpoint Inexistente
### Descrição:
Este teste verifica a resposta da API ao enviar uma requisição para um endpoint inexistente.
### Endpoint:
`POST /departamento/createsssssssssssssssssssssss`
### Validações:
- Verifica se o status da resposta é 404 (Not Found).

## 4. Criar Departamento com Dados Válidos
### Descrição:
Este teste verifica a criação de um departamento com todos os campos obrigatórios preenchidos corretamente.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se a mensagem retornada é "Departamento criado com sucesso".
- Armazena o `codigo_departamento` do departamento criado.

## 5. Validar Schema do Departamento Criado
### Descrição:
Este teste valida o schema do JSON de resposta com o modelo predefinido.
### Endpoint:
`POST /departamento/create`
### Validações:
- Valida se o JSON de resposta corresponde ao schema `schemaDepartamentoPOST`.

## 6. Criar Departamento com Código de Máximo de Caracteres
### Descrição:
Este teste verifica se a API valida a criação de um departamento com código de até 60 caracteres.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 422 (Unprocessable Entity).
- Valida se a mensagem de erro retornada é "O tamanho máximo do código é 60 caracteres".

## 7. Criar Departamento com Descrição de Máximo de Caracteres
### Descrição:
Este teste verifica se a API valida a criação de um departamento com descrição de até 60 caracteres.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 422 (Unprocessable Entity).
- Valida se a mensagem de erro retornada é "O tamanho máximo da descrição é 60 caracteres".

## 8. Criar Departamento com Código Null
### Descrição:
Este teste verifica se a API impede a criação de um departamento com código `null`.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 422 (Unprocessable Entity).
- Valida se a mensagem de erro retornada é "O código do departamento é obrigatório".

## 9. Criar Departamento com Código Existente
### Descrição:
Este teste verifica se a API impede a criação de um departamento com um código já existente.
### Endpoint:
`POST /departamento/create`
### Val
