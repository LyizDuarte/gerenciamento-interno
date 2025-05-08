import Database from "../db/database.js"

export default class AumentoSalarialModel {
  #banco

  #id
  #data
  #percentual
  #usuario

  set banco(value) {
    this.#banco = value
  }

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get data() {
    return this.#data
  }
  set data(value) {
    this.#data = value
  }
  get percentual() {
    return this.#percentual
  }
  set percentual(value) {
    this.#percentual = value
  }
  get usuario() {
    return this.#usuario
  }
  set usuario(value) {
    this.#usuario = value
  }

  constructor(id, data, percentual, usuario) {
    this.#banco = new Database()

    this.#id = id
    this.#data = data
    this.#percentual = percentual
    this.#usuario = usuario
  }

  async registrarAumento(percentual, usuario) {
    let sql = `insert into tb_aumentosalario (aus_data, aus_percentual, usu_id) values (curdate(), ?, ?)`
    let params = [percentual, usuario]
    let result = await this.#banco.ExecutaComando(sql, params)
    return result
  }

  async aumentarSalario(percentual) {
    let sql = `update tb_funcionario set fun_salario = fun_salario +  (fun_salario * ?  / 100) where fun_datademissao is null`
    let params = percentual
    let result = await this.#banco.ExecutaComando(sql, params)
    return result
  }
}
