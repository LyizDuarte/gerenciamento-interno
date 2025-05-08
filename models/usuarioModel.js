import Database from "../db/database.js"

export default class UsuarioModel {
  #banco

  #id
  #nome
  #email
  #ativo
  #senha

  set banco(value) {
    this.#banco = value
  }

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get nome() {
    return this.#nome
  }
  set nome(value) {
    this.#nome = value
  }
  get email() {
    return this.#email
  }
  set email(value) {
    this.#email = value
  }
  get ativo() {
    return this.#ativo
  }
  set ativo(value) {
    this.#ativo = value
  }
  get senha() {
    return this.#senha
  }
  set senha(value) {
    this.#senha = value
  }

  constructor(id, nome, email, ativo, senha) {
    this.#banco = new Database()

    this.#id = id
    this.#nome = nome
    this.#email = email
    this.#ativo = ativo
    this.#senha = senha
  }

  async obter(id) {
    let sql = `select * from tb_usuariorh where usu_id = ?`
    let params = id
    let rows = await this.#banco.ExecutaComando(sql, params)
    let row = rows[0]
    return row["usu_id"]
  }

  async obterCompleto(id) {
    let sql = `select * from tb_usuariorh where usu_id = ?`
    let params = id
    let rows = await this.#banco.ExecutaComando(sql, params)
    let row = rows[0]
    return new UsuarioModel(
      row["usu_id"],
      row["usu_nome"],
      row["usu_email"],
      row["usu_ativo"],
      row["usu_senha"]
    )
  }

  async login(email, senha) {
    let sql = `select * from tb_usuariorh where usu_email = ? and usu_senha = ?`
    let params = [email, senha]
    let rows = await this.#banco.ExecutaComando(sql, params)
    if (rows.length > 0) {
      let row = rows[0]
      return new UsuarioModel(
        row["usu_id"],
        row["usu_nome"],
        row["usu_email"],
        row["usu_ativo"],
        row["usu_senha"]
      )
    }
    return null
  }
}
