import FuncionarioModel from "../models/funcionarioModel.js"
import CargoModel from "../models/cargoModel.js"

export default class FuncionarioController {
  #funcionarioModel
  #cargoModel

  constructor() {
    this.#funcionarioModel = new FuncionarioModel()
    this.#cargoModel = new CargoModel()
  }

  async cadastrar(req, res) {
    let { cpf, nome, salario, cargo } = req.body
    if (!cpf || !nome || !salario || !cargo) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" })
    }
    let cargoId = await this.#cargoModel.obter(cargo)
    if (!cargoId) {
      return res.status(404).json({ msg: "Esse cargo não existe" })
    }
    let funcionario = new FuncionarioModel(
      0,
      cpf,
      nome,
      salario,
      new Date(),
      0,
      cargoId
    )
    let funcionarioSalvo = await this.#funcionarioModel.gravar(funcionario)
    if (funcionarioSalvo) {
      return res
        .status(200)
        .json({ msg: "O funcionário foi cadastrado com sucesso!" })
    } else {
      return res
        .status(500)
        .json({ msg: "Ocorreu um erro ao cadastrar o funcionario" })
    }
  }

  async demitir(req, res) {
    let { id } = req.body
    if (!id) {
      return res
        .status(400)
        .json({ msg: "Preencha o campo de ID do funcionario" })
    }
    let funcionario = await this.#funcionarioModel.obter(id)
    if (!funcionario) {
      return res.status(404).json({ msg: "Este funcionario não existe" })
    }
    let funcionarioDemitido = await funcionario.demitir(id)
    if (!funcionarioDemitido) {
      return res
        .status(500)
        .json({ msg: "Não foi possivel demitir este funcionário" })
    }
    return res.status(200).json({ msg: "Funcionario demitido com sucesso!" })
  }
}
