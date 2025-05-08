import AumentoSalarialModel from "../models/aumentoSalarialModel.js"
import UsuarioModel from "../models/usuarioModel.js"

export default class AumentoSalarialController {
  #usuarioModel
  #aumentoModel

  constructor() {
    this.#usuarioModel = new UsuarioModel()
    this.#aumentoModel = new AumentoSalarialModel()
  }

  async registrarAumento(req, res) {
    let { percentual, usuarioId } = req.body
    if (!percentual || !usuarioId) {
      res.status(400).json({ msg: "Todos os campos são obrigatórios" })
    }
    let usuario = req.usuarioLogado
    if (!usuario) {
      res.status(404).json({ msg: "Você precisa estar autenticado!" })
    }
    let registro = await this.#aumentoModel.registrarAumento(percentual, usuario)
    if (!registro) {
      res.status(500).json({ msg: "O registro de aumento não foi criado" })
    }

    let aumento = await this.#aumentoModel.aumentarSalario(percentual)
    if (!aumento) {
      res.status(500).json({ msg: "O aumento do salário não foi feito" })
    }
    res.status(200).json({
      msg: "O registro de aumento foi criado com sucesso e os funcionários tiveram aumento!",
    })
  }
}
