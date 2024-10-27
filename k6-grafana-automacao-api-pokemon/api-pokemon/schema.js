export const pokemonSchema = {
  type: "object",
  properties: {
    count: {
      type: "integer",
    },
    next: {
      type: "string",
    },
    previous: {
      type: "null",
    },
    results: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            url: {
              type: "string",
            },
          },
          required: ["name", "url"],
        },
      ],
    },
  },
  required: ["count", "next", "previous", "results"],
};
