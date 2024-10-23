export const schema = {
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
        id_colaborador: {
          type: "string",
        },
        codigo_empresa: {
          type: "string",
        },
        cpfcnpj: {
          type: "string",
        },
        nome: {
          type: "string",
        },
        status: {
          type: "string",
        },
        usuario: {
          type: "string",
        },
        email: {
          type: "string",
        },
        cpf: {
          type: "string",
          minLength: 11,
          maxLength: 11,
        },
        codigo_jornada: {
          type: "string",
        },
        codigo_municipio: {
          type: "string",
        },
        codigo_funcao: {
          type: "string",
        },
        codigo_departamento: {
          type: "string",
        },
        pis: {
          type: ["null", "string"],
        },
        celular: {
          type: ["null", "string"],
        },
        data_nascimento: {
          type: ["null", "string"],
        },
        numero_folha: {
          type: ["null", "string"],
        },
        rne_ctps: {
          type: ["null", "string"],
        },
        data_admissao: {
          type: "string",
        },
        data_demissao: {
          type: ["null", "string"],
        },
        informacao_adicional: {
          type: ["null", "string"],
        },
        compensar_hora: {
          type: ["null", "boolean"],
        },
        periodo_experiencia: {
          type: ["null", "string"],
        },
        registro_offline: {
          type: ["null", "boolean"],
        },
        registro_aplicativo: {
          type: ["null", "boolean"],
        },
        exibir_banco_horas: {
          type: "boolean",
        },
        registro_web: {
          type: ["null", "boolean"],
        },
        nivel_acesso: {
          type: "string",
        },
      },
      required: [
        "id_colaborador",
        "codigo_empresa",
        "cpfcnpj",
        "nome",
        "status",
        "usuario",
        "email",
        "cpf",
        "codigo_jornada",
        "codigo_municipio",
        "codigo_funcao",
        "codigo_departamento",
        "pis",
        "celular",
        "data_nascimento",
        "numero_folha",
        "rne_ctps",
        "data_admissao",
        "data_demissao",
        "informacao_adicional",
        "compensar_hora",
        "periodo_experiencia",
        "registro_offline",
        "registro_aplicativo",
        "exibir_banco_horas",
        "registro_web",
        "nivel_acesso",
      ],
    },
  },
  required: ["status_code", "mensagem", "dados"],
};
