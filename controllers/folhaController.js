import FolhaModel from "../models/folhaModel.js"
import FuncionarioModel from "../models/funcionarioModel.js"
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
      let { ano, mes } = req.body
      if (ano && mes) {
        let folha = new FolhaModel(ano, mes, 0)
        if (await folha.gravar()) {
          let func = new FuncionarioModel()
          let funcionarios = await func.listar()
          let item = new ItensFolhaModel()
          for (let fun of funcionarios) {
            item.funcionario = fun
            item.folha = folha
            item.salario = fun.salario
            let valor = parseFloat(fun.salario)
            folha.valorTotal += valor
            if ((await item.gravar()) == null) {
              throw new Error("Erro ao gravar itens da folha!")
            }
          }
          if (await folha.atualizar()) {
            res.status(200).json({ msg: "Folha de pagamento gerada com sucesso!" })
          } else {
            throw new Error("Erro ao atualizar folha!")
          }
        } else {
          throw new Error("Erro ao gerar folha!")
        }
      } else {
        res.status(400).json({ msg: "Parametros invalidos!" })
      }
    } catch (Exception) {
      res.status(500).json({ msg: Exception.message })
    }
  }
}
