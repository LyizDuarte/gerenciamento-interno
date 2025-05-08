import Database from "../db/database.js"

export default class FolhaModel {
  #banco

  #id
  #ano
  #mes
  #valorTotal

  set banco(value) {
    this.#banco = value
  }

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get ano() {
    return this.#ano
  }
  set ano(value) {
    this.#ano = value
  }
  get mes() {
    return this.#mes
  }
  set mes(value) {
    this.#mes = value
  }
  get valorTotal() {
    return this.#valorTotal
  }
  set valorTotal(value) {
    this.#valorTotal = value
  }

  constructor(id, ano, mes, valorTotal) {
    this.#banco = new Database()

    this.#id = id
    this.#ano = ano
    this.#mes = mes
    this.#valorTotal = valorTotal
  }

  async gravar() {
    let sql = `insert into tb_folhapagamento (fol_ano, fol_mes, fol_valortotal) values (?, ?, ?)`
    let params = [this.#ano, this.#mes, this.#valorTotal]
    let result = await this.#banco.ExecutaComandoLastInserted(sql, params)
    this.#id = result
    return result
  }

  async atualizar() {
    let sql = `update tb_folhapagamento set fol_ano = ?, fol_mes = ?, fol_valortotal = ? where fol_id = ?`
    let params = [this.#ano, this.#mes, this.#valorTotal, this.#id]
    let result = await this.#banco.ExecutaComando(sql, params)
    return result
  }
}
