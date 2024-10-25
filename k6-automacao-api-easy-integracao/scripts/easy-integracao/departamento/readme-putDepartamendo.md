# Documentação dos Cenários de Teste - API de Departamentos

## 1. Criar Departamento
### Descrição:
Este teste cria um novo departamento que será utilizado para alterações subsequentes.
### Endpoint:
`POST /departamento/create`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Armazena o `codigo_departamento` do departamento recém-criado para uso em testes posteriores.
- Confirma que a mensagem de resposta é "Departamento criado com sucesso".

---

## 2. Alterar Departamento Inexistente
### Descrição:
Este teste tenta alterar um departamento que não existe na base de dados.
### Endpoint:
`PUT /departamento/update/`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).
- Confirma que a mensagem de erro é "Este departamento não existe".

---

## 3. Alterar Dados do Departamento
### Descrição:
Este teste altera todos os dados de um departamento existente previamente criado.
### Endpoint:
`PUT /departamento/update/`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Confirma que a mensagem de resposta é "Departamento atualizado com sucesso".

---

## 4. Deletar Departamento
### Descrição:
Este teste exclui o departamento criado no primeiro cenário.
### Endpoint:
`DELETE /departamento/exclude/{codigo_departamento}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Confirma que a mensagem de resposta é "Departamento excluído com sucesso".
"""

# Save markdown content to a file
with open("/mnt/data/Documentacao_Testes_API_Departamento.md", "w") as file:
    file.write(markdown_content)

"/mnt/data/Documentacao_Testes_API_Departamento.md"
