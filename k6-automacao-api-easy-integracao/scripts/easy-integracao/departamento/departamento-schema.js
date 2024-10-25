export const schemaDepartamentoPOST = {
  type: "object",
  properties: {
    status_code: {
      type: "string",
    },
    mensagem: {
      type: "string",
    },
    dados: {
      type: "object",
      properties: {
        codigo_departamento: {
          type: "string",
        },
        descricao: {
          type: "string",
        },
      },
      required: ["codigo_departamento", "descricao"],
    },
  },
  required: ["status_code", "mensagem", "dados"],
};

export const schemaDepartamentoGET = {
  type: "object",
  properties: {
    status_code: {
      type: "string",
    },
    quantidade_registros: {
      type: "integer",
    },
    mensagem: {
      type: "string",
    },
    dados: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            codigo_departamento: {
              type: "string",
            },
            descricao: {
              type: "string",
            },
          },
          required: ["codigo_departamento", "descricao"],
        },
      ],
    },
  },
  required: ["status_code", "quantidade_registros", "mensagem", "dados"],
};
