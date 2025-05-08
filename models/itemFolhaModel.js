import Database from "../db/database.js"

export default class ItensFolhaModel {
  #banco

  #id
  #salario
  #funcionario
  #folha

  set banco(value) {
    this.#banco = value
  }

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get salario() {
    return this.#salario
  }
  set salario(value) {
    this.#salario = value
  }
  get funcionario() {
    return this.#funcionario
  }
  set funcionario(value) {
    this.#funcionario = value
  }
  get folha() {
    return this.#folha
  }
  set folha(value) {
    this.#folha = value
  }

  constructor(id, salario, funcionario, folha) {
    this.#banco = new Database()

    this.#id = id
    this.#salario = salario
    this.#funcionario = funcionario
    this.#folha = folha
  }

  async gravar() {
    let sql = `insert into tb_itensfolhapagamento (ifp_salario, fun_id, fol_id) values (?, ?, ?)`
    let params = [salario, funcionario, folha]
    let result = await this.#banco.ExecutaComando(sql, params)
    return result
  }
}
