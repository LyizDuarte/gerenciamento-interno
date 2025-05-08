import express from "express"
import FuncionarioController from "../controllers/funcionarioController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()
let ctrl = new FuncionarioController()
let auth = new AuthMiddleware()

router.post("/funcionario", auth.validar, (req, res) => {
  // #swagger.tags = ["Funcionario"]
  // #swagger.summary = "Cadastra um funcionario"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/funcionario"
                }
            }
        }
   } 
    #swagger.security = [{
        "bearerAuth": []    
    }]
  */
  ctrl.cadastrar(req, res)
})

router.patch("/funcionario/demitir", auth.validar, (req, res) => {
  // #swagger.tags = ["Funcionario"]
  // #swagger.summary = "Demite um funcionario"
  /* #swagger.requestBody = {
          required: true,
          content:{
              "application/json":{
                  schema:{
                      $ref: "#/components/schemas/funcionarioDemitir"
                  }
              }
          }
     } 
        #swagger.security = [{
        "bearerAuth": []    
    }]
    */
  ctrl.demitir(req, res)
})

export default router
