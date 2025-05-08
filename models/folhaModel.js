import Database from "../db/database.js"

export default class FolhaModel {
  #id
  #ano
  #mes
  #valorTotal

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

  constructor(ano, mes, valorTotal) {
    this.#ano = ano
    this.#mes = mes
    this.#valorTotal = valorTotal
  }

  async gravar(banco) {
    let sql = `insert into tb_folhapagamento (fol_ano, fol_mes, fol_valortotal) values (?, ?, ?)`
    let params = [this.#ano, this.#mes, this.#valorTotal]
    let result = await banco.ExecutaComandoLastInserted(sql, params)
    this.#id = result
    return result
  }

  async atualizar(banco) {
    let sql = `update tb_folhapagamento set fol_ano = ?, fol_mes = ?, fol_valortotal = ? where fol_id = ?`
    let params = [this.#ano, this.#mes, this.#valorTotal, this.#id]
    let result = await banco.ExecutaComando(sql, params)
    return result
  }
}
