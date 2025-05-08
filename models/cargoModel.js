import Database from "../db/database.js"

export default class CargoModel {
  #banco
  #id
  #descricao

  set banco(value) {
    this.#banco = value
  }

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get descricao() {
    return this.#descricao
  }
  set descricao(value) {
    this.#descricao = value
  }

  constructor(id, descricao) {
    this.#banco = new Database()
    this.#id = id
    this.#descricao = descricao
  }

  async listar() {
    let sql = `select * from tb_cargo`
    let rows = await this.#banco.ExecutaComando(sql)
    let lista = []
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      lista.push(row["car_id"], row["car_descricao"])
    }
    return lista
  }

  async obter(id) {
    let sql = `select * from tb_cargo where car_id = ?`
    let params = [id]
    let rows = await this.#banco.ExecutaComando(sql, params)
    let row = rows[0]
    return row["car_id"]
  }
}
