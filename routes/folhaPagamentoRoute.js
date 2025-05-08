import express from "express"
import FolhaController from "../controllers/folhaController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()
let ctrl = new FolhaController()
let auth = new AuthMiddleware()

router.post("/folha", auth.validar, (req, res) => {
  // #swagger.tags = ["Folha de Pagamento"]
  // #swagger.summary = "Gera a folha de pagamento"
  /* 
    #swagger.security = [{
        "bearerAuth": []    
    }]
  */
  ctrl.gerarFolha(req, res)
})

export default router
