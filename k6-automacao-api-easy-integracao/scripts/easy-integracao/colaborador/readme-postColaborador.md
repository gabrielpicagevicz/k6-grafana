# Cenários de Teste para POST de Colaborador
### 1. Criar Colaborador com Payload Completo
**Descrição:** Envia um payload completo com todos os campos obrigatórios preenchidos corretamente para criar um colaborador.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 201

---

### 2. Verificar Token Inválido
**Descrição:** Testa a criação de um colaborador utilizando um token inválido.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Token:** `token_inexistente`
- **Status Esperado:** 403
- **Mensagem de Erro Esperada:** "Token inválido"

---

### 3. Verificar Request Sem Header
**Descrição:** Envia uma requisição para criar um colaborador sem o header de autorização.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 401
- **Mensagem de Erro Esperada:** "Token inválido"

---

### 4. Verificar Endpoint Inexistente
**Descrição:** Envia uma requisição para um endpoint inexistente.
- **Método:** POST
- **Endpoint:** `/colaborador/createsssssssssssssssssssssss`
- **Status Esperado:** 404

---

### 5. Validar Schema do Colaborador
**Descrição:** Valida o schema do JSON retornado da API em relação ao schema predefinido.
- **Modelo de Validação:** `colaborador-schema.js`

---

### 6. Criar Colaborador com Campos Opcionais Nulos
**Descrição:** Envia um payload com os campos opcionais preenchidos como `nulo` para criar um colaborador.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 201

---

### 7. Criar Colaborador com CPF Inválido
**Descrição:** Tenta criar um colaborador usando um CPF inválido.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "Mínimo de caracteres no CPF é 11"

---

### 8. Criar Colaborador Omitindo CPF do Responsável
**Descrição:** Envia um payload para criar um colaborador omitindo o campo `responsavel_cpf`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O CPF do responsável é obrigatório"

---

### 9. Criar Colaborador Omitindo CNPJ/CPF
**Descrição:** Envia um payload para criar um colaborador omitindo o campo `cpfcnpj`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O CNPJ/CPF é obrigatório"

---

### 10. Criar Colaborador Omitindo Nome
**Descrição:** Tenta criar um colaborador sem o campo `nome`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O nome é obrigatório"

---

### 11. Criar Colaborador Omitindo CPF
**Descrição:** Tenta criar um colaborador sem o campo `cpf`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O CPF é obrigatório"

---

### 12. Criar Colaborador Omitindo Código do Município
**Descrição:** Envia um payload para criar um colaborador sem o campo `codigo_municipio`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O código do município é obrigatório"

---

### 13. Criar Colaborador Omitindo Código da Jornada
**Descrição:** Tenta criar um colaborador sem o campo `codigo_jornada`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** Campo obrigatório faltando.

---

### 14. Criar Colaborador Omitindo Código da Função
**Descrição:** Envia um payload para criar um colaborador sem o campo `codigo_funcao`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O código da função é obrigatório"

---

### 15. Criar Colaborador Omitindo Código do Departamento
**Descrição:** Tenta criar um colaborador sem o campo `codigo_departamento`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "O código do departamento é obrigatório"

---

### 16. Criar Colaborador Omitindo Data de Admissão
**Descrição:** Envia um payload para criar um colaborador sem o campo `data_admissao`.
- **Método:** POST
- **Endpoint:** `/colaborador/create`
- **Status Esperado:** 400
- **Mensagem de Erro Esperada:** "Dados inválidos"
- **Detalhe do Erro:** "A data de admissão é obrigatória"
