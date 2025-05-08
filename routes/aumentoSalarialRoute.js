import express from "express"
import AumentoSalarialController from "../controllers/aumentoSalarialController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()
let ctrl = new AumentoSalarialController()
let auth = new AuthMiddleware()

router.post("/aumento", auth.validar, (req, res) => {
  // #swagger.tags = ["Aumento Salarial"]
  // #swagger.summary = "Registra e faz o aumento dos funcionários"
  /* #swagger.requestBody = {
        required: true,
        content:{
            "application/json":{
                schema:{
                    $ref: "#/components/schemas/aumentoSalarial"
                }
            }
        }
   } 
    #swagger.security = [{
        "bearerAuth": []    
    }]
  */
  ctrl.registrarAumento(req, res)
})

export default router
