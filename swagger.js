import swaggerAutogen from "swagger-autogen"
const doc = {
  info: {
    title: "Sistema de Gerenciamento de RH - API",
    description:
      "API do sistema de gerenciment do departamento de Recursos Humanos",
  },
  host: "localhost:5000",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      funcionario: {
        cpf: "4972382343",
        nome: "Etevaldinho Bilu",
        salario: 1500,
        cargo: 1,
      },
      funcionarioDemitir: {
        id: 1,
      },
      aumentoSalarial: {
        percentual: 10,
        usuarioId: 1,
      },
      usuarioRH: {
        email: "maria@rh.com",
        senha: 123,
      },
    },
  },
}

const outputJson = "./swagger-output.json"
const routes = ["./server.js"]

swaggerAutogen({ openapi: "3.0.0", autoHeaders: false })(
  outputJson,
  routes,
  doc
).then(async () => {
  await import("./server.js")
})
