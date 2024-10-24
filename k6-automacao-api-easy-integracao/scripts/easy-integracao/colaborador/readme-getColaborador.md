# Documentação dos Cenários de Teste - API de Colaboradores

## 1. Buscar Colaboradores sem Filtro
### Descrição:
Este teste realiza uma requisição à API de colaboradores sem aplicar nenhum filtro.
### Endpoint:
`GET /colaborador/`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Armazena os valores retornados, como `cpfcnpj`, `id_colaborador`, `cpf_colaborador`, `codigo_departamento`, entre outros, para serem usados em testes subsequentes.

## 2. Buscar Colaboradores com Filtro Inexistente
### Descrição:
Teste para validar o comportamento da API ao passar um filtro inexistente.
### Endpoint:
`GET /colaborador/?filtronaoexiste=1`
### Validações:
- Verifica se o status da resposta é 400 (Bad Request).

## 3. Validação do Schema da API de Colaboradores
### Descrição:
Valida o schema JSON retornado pela API de acordo com um modelo pré-definido no arquivo `colaborador-schema.js`.
### Validações:
- Verifica se o JSON retornado é válido.
- Compara o JSON retornado com o schema `schemaColaboradorGet`.

## 4. Buscar Colaboradores com Filtro `limit`
### Descrição:
Realiza a busca com o filtro `limit` para limitar o número de resultados retornados.
### Endpoint:
`GET /colaborador?limit=1`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se a quantidade de registros retornados é igual ao valor passado no filtro (`limit=1`).
- Verifica a mensagem retornada no body.
- Verifica se há dados dentro do JSON retornado.

## 5. Buscar Colaboradores com Filtro de Demissão (True)
### Descrição:
Realiza a busca de colaboradores demitidos (`demitidos=true`).
### Endpoint:
`GET /colaborador?demitidos=true`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Verifica se o campo `data_demissao` não é nulo.

## 6. Buscar Colaboradores com Filtro de Demissão (False)
### Descrição:
Realiza a busca de colaboradores não demitidos (`demitidos=false`).
### Endpoint:
`GET /colaborador?demitidos=false`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Verifica se o campo `data_demissao` é nulo.

## 7. Buscar Colaboradores com Filtro `cpfcnpj`
### Descrição:
Busca colaboradores com o filtro `cpfcnpj` obtido anteriormente.
### Endpoint:
`GET /colaborador?cpfcnpj={cpfcnpj}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `cpfcnpj` retornado corresponde ao valor esperado.

## 8. Buscar Colaboradores com Filtro `id_colaborador`
### Descrição:
Busca colaboradores com o filtro `id_colaborador` obtido anteriormente.
### Endpoint:
`GET /colaborador?id_colaborador={id_colaborador}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `id_colaborador` retornado corresponde ao valor esperado.

## 9. Buscar Colaboradores com Filtro `cpf_colaborador`
### Descrição:
Busca colaboradores com o filtro `cpf_colaborador` obtido anteriormente.
### Endpoint:
`GET /colaborador?cpf_colaborador={cpf_colaborador}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `cpf_colaborador` retornado corresponde ao valor esperado.

## 10. Buscar Colaboradores com Filtro `codigo_departamento`
### Descrição:
Busca colaboradores com o filtro `codigo_departamento` obtido anteriormente.
### Endpoint:
`GET /colaborador?codigo_departamento={codigo_departamento}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `codigo_departamento` retornado corresponde ao valor esperado.

## 11. Buscar Colaboradores com Filtro `codigo_funcao`
### Descrição:
Busca colaboradores com o filtro `codigo_funcao` obtido anteriormente.
### Endpoint:
`GET /colaborador?codigo_funcao={codigo_funcao}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `codigo_funcao` retornado corresponde ao valor esperado.

## 12. Buscar Colaboradores com Filtro `codigo_jornada`
### Descrição:
Busca colaboradores com o filtro `codigo_jornada` obtido anteriormente.
### Endpoint:
`GET /colaborador?codigo_jornada={codigo_jornada}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `codigo_jornada` retornado corresponde ao valor esperado.

## 13. Buscar Colaboradores com Filtro `codigo_municipio`
### Descrição:
Busca colaboradores com o filtro `codigo_municipio` obtido anteriormente.
### Endpoint:
`GET /colaborador?codigo_municipio={codigo_municipio}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `codigo_municipio` retornado corresponde ao valor esperado.

## 14. Buscar Colaboradores com Filtro `attributes`
### Descrição:
Busca colaboradores com o filtro `attributes` aplicado ao `id_colaborador`.
### Endpoint:
`GET /colaborador?attributes={id_colaborador}`
### Validações:
- Verifica se o status da resposta é 200 (OK).
- Valida se o `id_colaborador` retornado corresponde ao valor esperado.

## 15. Buscar Colaboradores com Filtro de Ordenação (Order)
### Descrição:
Busca colaboradores aplicando o filtro de ordenação (`order`).
### Endpoint:
`GET /colaborador?order=cpf`
### Validações:
- Verifica se o status da resposta é 200 (OK).

## 16. Test Suite Completo
### Descrição:
Executa todos os cenários de testes descritos acima em sequência.
