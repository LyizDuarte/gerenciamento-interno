import Database from "../db/database.js"
import FolhaModel from "../models/folhaModel.js"
import FuncionarioModel from "../models/funcionarioModel.js"
import ItensFolhaModel from "../models/itemFolhaModel.js"

export default class FolhaController {
  async gerarFolha(req, res) {
    let banco = new Database()
    try {
      await banco.AbreTransacao()
      let { ano, mes } = req.body
      if (ano && mes) {
        let folha = new FolhaModel(ano, mes, 0)
        if (await folha.gravar(banco)) {
          let func = new FuncionarioModel()
          let funcionarios = await func.listar(banco)
          let item = new ItensFolhaModel()
          for (let fun of funcionarios) {
            item.funcionario = fun.id
            item.folha = folha.id
            item.salario = fun.salario
            let valor = parseFloat(fun.salario)
            folha.valorTotal += valor
            if ((await item.gravar(banco)) == null) {
              throw new Error("Erro ao gravar itens da folha!")
            }
          }
          if (await folha.atualizar(banco)) {
            await banco.Commit()
            res
              .status(200)
              .json({ msg: "Folha de pagamento gerada com sucesso!" })
          } else {
            throw new Error("Erro ao atualizar folha!")
          }
        } else {
          throw new Error("Erro ao gerar folha!")
        }
      } else {
        throw new Error("Parametros invalidos!")
      }
    } catch (Exception) {
      await banco.Rollback()
      res.status(500).json({ msg: Exception.message })
    }
  }
}
