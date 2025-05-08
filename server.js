import express from "express"

import swaggerUi from "swagger-ui-express"
import cookieParser from "cookie-parser"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const outputJson = require("./swagger-output.json")
import funcionarioRoute from "./routes/funcionarioRoute.js"
import aumentoRoute from "./routes/aumentoSalarialRoute.js"
import autenticacaoRoute from "./routes/autenticacaoRoute.js"
import folhaRoute from "./routes/folhaPagamentoRoute.js"

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson))
app.use("/", autenticacaoRoute)
app.use("/", funcionarioRoute)
app.use("/", aumentoRoute)
app.use("/", folhaRoute)

app.listen(5000, function () {
  console.log("servidor web em funcionamento!")
})
