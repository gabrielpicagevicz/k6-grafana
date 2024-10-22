# Cenários de Teste para POST de Colaborador

## Cenários de Sucesso

### 1. Cadastro Completo
- **Entrada:** Payload completo com todos os campos obrigatórios preenchidos corretamente.
- **Resultado Esperado:** Retorno de sucesso (status 201 Created).

### 2. Campos Opcionais Preenchidos com Nulo
- **Entrada:** Campos opcionais como `celular`, `informacao_adicional`, etc., são deixados como `null`.
- **Resultado Esperado:** Retorno de sucesso (status 201 Created).

### 3. Compensação de Hora Desativada
- **Entrada:** `compensar_hora` como `false`.
- **Resultado Esperado:** Retorno de sucesso (status 201 Created).

## Cenários de Falha
1. **CPF do Responsável Inválido**
   - Campo `responsavel_cpf` com valor inválido (menos de 11 dígitos ou caracteres não numéricos).
   - **Esperado:** Erro de validação indicando CPF inválido.

2. **CNPJ Inválido**
   - Campo `cpfcnpj` com valor inválido (menos de 14 dígitos ou caracteres não numéricos).
   - **Esperado:** Erro de validação indicando CNPJ inválido.

3. **Email Inválido**
   - Campo `email` com formato inválido (sem "@" ou domínio).
   - **Esperado:** Erro de validação indicando email inválido.

4. **Data de Admissão Futura**
   - Campo `data_admissao` com data no futuro.
   - **Esperado:** Erro de validação indicando data de admissão inválida.

5. **Data de Nascimento no Futuro**
   - Campo `data_nascimento` com data no futuro.
   - **Esperado:** Erro de validação indicando data de nascimento inválida.

6. **Campo Obrigatório Ausente**
   - Omissão de um campo obrigatório, como `nome` ou `cpf`.
   - **Esperado:** Erro de validação indicando campo obrigatório ausente.

7. **Código de Município Inválido**
   - Campo `codigo_municipio` com valor inválido (menos de 7 dígitos ou caracteres não numéricos).
   - **Esperado:** Erro de validação indicando código de município inválido.

8. **Código de Jornada Inválido**
   - Campo `codigo_jornada` com valor fora do intervalo permitido.
   - **Esperado:** Erro de validação indicando código de jornada inválido.

9. **Código de Função Inválido**
   - Campo `codigo_funcao` com valor fora do intervalo permitido.
   - **Esperado:** Erro de validação indicando código de função inválido.

10. **Código de Departamento Inválido**
    - Campo `codigo_departamento` com valor fora do intervalo permitido.
    - **Esperado:** Erro de validação indicando código de departamento inválido.