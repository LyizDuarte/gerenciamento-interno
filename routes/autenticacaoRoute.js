import express from "express"
import AutenticacaoController from "../controllers/autenticacaoController.js"

const router = express.Router()
let ctrl = new AutenticacaoController()

router.post("/autenticacao", (req, res) => {
  // #swagger.tags = ["Autenticação"]
  // #swagger.summary = "Gera um token para um aluno matriculado"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/usuarioRH"
                }
            }
        }
   } 
  */
  ctrl.token(req, res)
})

export default router
