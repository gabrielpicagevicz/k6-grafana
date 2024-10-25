# Documentação dos Cenários de Teste - API de Departamentos

## 1. Buscar Departamento sem Filtro
### Descrição:
Este teste verifica a recuperação dos dados de departamentos sem aplicação de filtros.
### Endpoint:
`GET /departamento/`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Armazena o `codigo_departamento` do primeiro departamento da lista retornada.

## 2. Validar o Esquema do Departamento Retornado
### Descrição:
Este teste valida o esquema do JSON retornado da API comparando com o modelo predefinido em `departamento-schema.js`.
### Endpoint:
`GET /departamento/`
### Validações:
- Verifica se o JSON retornado está conforme o esquema `schemaDepartamentoGET`.

## 3. Buscar Departamento com Filtro `codigo_departamento`
### Descrição:
Este teste verifica a recuperação de dados de departamento usando o filtro `codigo_departamento`.
### Endpoint:
`GET /departamento?codigo_departamento={codigo_departamento}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Verifica a mensagem no corpo da resposta: `"Registros encontrados:"`.
- Confirma que há pelo menos um dado no JSON retornado.
- Valida que o `codigo_departamento` corresponde ao código armazenado previamente.

## 4. Buscar Departamento com Filtro Inexistente
### Descrição:
Este teste verifica o comportamento da API ao usar um filtro que não existe.
### Endpoint:
`GET /departamento/?filtronaoexiste=1`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).

## 5. Buscar Departamento com Filtro `limit`
### Descrição:
Este teste verifica a recuperação de dados de departamento aplicando um filtro `limit`.
### Endpoint:
`GET /departamento?limit={limit}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida que a quantidade de registros corresponde ao valor do filtro `limit`.
- Confirma a mensagem no corpo da resposta: `"Registros encontrados:"`.
- Confirma que o JSON retornado contém pelo menos um registro.

## 6. Buscar Departamento com Filtro `attributes` e `codigo_departamento`
### Descrição:
Este teste verifica a recuperação de dados do colaborador usando os filtros `attributes` e `codigo_departamento`.
### Endpoint:
`GET /colaborador?attributes={codigo_departamento}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida que o JSON retornado contém registros.
- Confirma que o campo `codigo_departamento` no filtro corresponde ao valor armazenado previamente.

---

Esses cenários de teste garantem que a API de Departamentos funciona corretamente em vários cenários e com diferentes filtros aplicados.
