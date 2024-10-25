export const schemafuncaoPOST = {
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
        codigo_funcao: {
          type: "string",
        },
        descricao: {
          type: "string",
        },
      },
      required: ["codigo_funcao", "descricao"],
    },
  },
  required: ["status_code", "mensagem", "dados"],
};

export const schemaFuncaoGET = {
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
            funcao: {
              type: "string",
            },
            descricao: {
              type: "string",
            },
          },
          required: ["codigo_funcao", "descricao"],
        },
      ],
    },
  },
  required: ["status_code", "quantidade_registros", "mensagem", "dados"],
};
