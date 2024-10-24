# Documentação dos Cenários de Teste - API de Colaboradores (PUT)

## 1. Alterar Colaborador Existente
### Descrição:
Este teste altera os dados de um colaborador já existente.
### Endpoint:
`PUT /colaborador/update/`
### Validações:
- Verifica se o status da resposta é 201 (Created).
- Valida a mensagem de sucesso `"Colaborador atualizado com sucesso"`.
- Verifica se os dados do colaborador foram atualizados corretamente.

## 2. Alterar Colaborador com Usuário Já Existente
### Descrição:
Teste para validar a tentativa de alterar um colaborador utilizando um usuário já existente.
### Endpoint:
`PUT /colaborador/update/`
### Validações:
- Verifica se o status da resposta é 409 (Conflict).
- Valida se a mensagem de erro `"Este usuário já está sendo utilizado"` está presente.

## 3. Alterar Colaborador Sem Passar ID
### Descrição:
Este teste verifica o comportamento da API ao tentar alterar os dados de um colaborador sem passar o `id_colaborador`.
### Endpoint:
`PUT /colaborador/update/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Valida se a mensagem de erro `"O ID do colaborador é obrigatório"` está presente.

## 4. Alterar Colaborador com Data de Admissão Incorreta
### Descrição:
Este teste verifica o comportamento da API ao tentar alterar o colaborador com uma data de admissão incorreta.
### Endpoint:
`PUT /colaborador/update/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Valida se a mensagem de erro `"A data de admissão precisa ser do tipo date"` está presente.

## 5. Alterar Colaborador Inexistente
### Descrição:
Este teste verifica o comportamento da API ao tentar alterar um colaborador que não existe.
### Endpoint:
`PUT /colaborador/update/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Valida se a mensagem de erro `"Este id de colaborador não existe"` está presente.

