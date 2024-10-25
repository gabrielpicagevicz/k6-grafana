function gerarCodigoUnico() {
  let numeros = "";
  for (let i = 0; i < 11; i++) {
    numeros += Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
  }
  return numeros;
}
const departamentoTestesAutomaticosTokenInvalido = {
  codigo_departamento: gerarCodigoUnico(),
  descricao: "Departamento de Testes Automatizados",
};

const departamentoTestesAutomaticosEndPointInexistente = {
  codigo_departamento: gerarCodigoUnico(),
  descricao: "Departamento de Testes Automatizados",
};

const departamentoTestesAutomaticosSemHeader = {
  codigo_departamento: gerarCodigoUnico(),
  descricao: "Departamento de Testes Automatizados",
};

const departamentoTestesAutomaticos = {
  codigo_departamento: gerarCodigoUnico(),
  descricao: "Departamento de Testes Automatizados",
};

const departamentoTestesAutomaticosMaxCaractereCodigo = {
  codigo_departamento:
    "0000000000000000000000000000000000000000000000000000000000001",
  descricao: "123",
};

const departamentoTestesAutomaticosMaxCaractereDescricao = {
  codigo_departamento: "123",
  descricao: "0000000000000000000000000000000000000000000000000000000000001",
};

const departamentoCodigoNull = {
  codigo_departamento: null,
  descricao: "023",
};

const departamentoCodigoJaExistente = {
  codigo_departamento: null,
  descricao: "023",
};

const departamentoPUT = {
  codigo_departamento: gerarCodigoUnico(),
  descricao: "alterado",
};

const departamentoPUTInexistente = {
  codigo_departamento: "Z||||",
  descricao: "Informática",
};

export {
  departamentoTestesAutomaticos,
  departamentoTestesAutomaticosMaxCaractereCodigo,
  departamentoTestesAutomaticosMaxCaractereDescricao,
  departamentoCodigoNull,
  departamentoTestesAutomaticosTokenInvalido,
  departamentoTestesAutomaticosEndPointInexistente,
  departamentoTestesAutomaticosSemHeader,
  departamentoCodigoJaExistente,
  departamentoPUT,
  departamentoPUTInexistente,
};
