module.exports = {
  main: {
    input: {
      target: "./swagger.local.json",
    },
    output: {
      mode: "tags-split",
      target: "./src/api",
      schemas: "./src/api/model",
      client: "react-query",
      clean: true,
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "npx prettier --write .",
    },
  },
};
