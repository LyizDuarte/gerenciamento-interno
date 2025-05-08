import FolhaModel from "../models/folhaModel.js"
import ItensFolhaModel from "../models/itemFolhaModel.js"

export default class FolhaController {
  #folhaModel
  #itensFolhaModel

  constructor() {
    this.#folhaModel = new FolhaModel()
    this.#itensFolhaModel = new ItensFolhaModel()
  }

  async gerarFolha(req, res) {
    try {
      
    } catch (Exception) {
      res.status(500).json({ msg: Exception.message })
    }
  }
}
