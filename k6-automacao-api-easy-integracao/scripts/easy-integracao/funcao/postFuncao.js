function gerarCodigoUnico() {
  let numeros = "";
  for (let i = 0; i < 11; i++) {
    numeros += Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
  }
  return numeros;
}

const funcao = {
  codigo_funcao: gerarCodigoUnico(),
  descricao: "Analista de Teste de Software",
};

function gerarCodigoUnico() {
  let numeros = "";
  for (let i = 0; i < 11; i++) {
    numeros += Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
  }
  return numeros;
}
const funcaoTestesAutomaticosTokenInvalido = {
  codigo_funcao: gerarCodigoUnico(),
  descricao: "funcao de Testes Automatizados",
};

const funcaoTestesAutomaticosEndPointInexistente = {
  codigo_funcao: gerarCodigoUnico(),
  descricao: "funcao de Testes Automatizados",
};

const funcaoTestesAutomaticosSemHeader = {
  codigo_funcao: gerarCodigoUnico(),
  descricao: "funcao de Testes Automatizados",
};

const funcaoTestesAutomaticos = {
  codigo_funcao: gerarCodigoUnico(),
  descricao: "funcao de Testes Automatizados",
};

const funcaoTestesAutomaticosMaxCaractereCodigo = {
  codigo_funcao:
    "0000000000000000000000000000000000000000000000000000000000001",
  descricao: "123",
};

const funcaoTestesAutomaticosMaxCaractereDescricao = {
  codigo_funcao: "123",
  descricao: "0000000000000000000000000000000000000000000000000000000000001",
};

const funcaoCodigoNull = {
  codigo_funcao: null,
  descricao: "023",
};

const funcaoCodigoJaExistente = {
  codigo_funcao: null,
  descricao: "023",
};

const funcaoPUT = {
  codigo_funcao: gerarCodigoUnico(),
  descricao: "alterado",
};

const funcaoPUTInexistente = {
  codigo_funcao: "Z||||",
  descricao: "Informática",
};

export {
  funcao,
  funcaoTestesAutomaticos,
  funcaoTestesAutomaticosMaxCaractereCodigo,
  funcaoTestesAutomaticosMaxCaractereDescricao,
  funcaoCodigoNull,
  funcaoTestesAutomaticosTokenInvalido,
  funcaoTestesAutomaticosEndPointInexistente,
  funcaoTestesAutomaticosSemHeader,
  funcaoCodigoJaExistente,
  funcaoPUT,
  funcaoPUTInexistente,
};
