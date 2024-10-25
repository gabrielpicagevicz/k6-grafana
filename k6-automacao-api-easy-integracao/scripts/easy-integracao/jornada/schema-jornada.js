export const schemaColaboradorPost = {
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
            codigo_jornada: {
              type: ["null", "string"],
            },
            ativo: {
              type: "boolean",
            },
            descricao: {
              type: "string",
            },
          },
          required: ["codigo_jornada", "ativo", "descricao"],
        },
      ],
    },
  },
  required: ["status_code", "quantidade_registros", "mensagem", "dados"],
};
