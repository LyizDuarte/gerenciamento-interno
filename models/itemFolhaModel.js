import Database from "../db/database.js"

export default class ItensFolhaModel {
  #id
  #salario
  #funcionario
  #folha

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

    this.#id = id
    this.#salario = salario
    this.#funcionario = funcionario
    this.#folha = folha
  }

  async gravar(banco) {
    let sql = `insert into tb_itensfolhapagamento (ifp_salario, fun_id, fol_id) values (?, ?, ?)`
    let params = [this.#salario, this.#funcionario, this.#folha]
    let result = await banco.ExecutaComando(sql, params)
    return result
  }
}
