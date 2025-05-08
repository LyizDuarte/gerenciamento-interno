import Database from "../db/database.js"

export default class FuncionarioModel {
  #banco

  #id
  #cpf
  #nome
  #salario
  #dataAdmissao
  #dataDemissao
  #cargo

  set banco(value) {
    this.#banco = value
  }

  get id() {
    return this.#id
  }
  set id(value) {
    this.#id = value
  }
  get cpf() {
    return this.#cpf
  }
  set cpf(value) {
    this.#cpf = value
  }
  get nome() {
    return this.#nome
  }
  set nome(value) {
    this.#nome = value
  }
  get salario() {
    return this.#salario
  }
  set salario(value) {
    this.#salario = value
  }
  get dataAdmissao() {
    return this.#dataAdmissao
  }
  set dataAdmissao(value) {
    this.#dataAdmissao = value
  }
  get dataDemissao() {
    return this.#dataDemissao
  }
  set dataDemissao(value) {
    this.#dataDemissao = value
  }
  get cargo() {
    return this.#cargo
  }
  set cargo(value) {
    this.#cargo = value
  }

  constructor(id, cpf, nome, salario, dataAdmissao, dataDemissao, cargo) {
    this.#banco = new Database()

    this.#id = id
    this.#cpf = cpf
    this.#nome = nome
    this.#salario = salario
    this.#dataAdmissao = dataAdmissao
    this.#dataDemissao = dataDemissao
    this.#cargo = cargo
  }

  async listar(db) {
    let sql = "select * from tb_funcionario where fun_datademissao is null"
    let rows = await db.ExecutaComando(sql)
    let lista = []
    for (let row of rows) {
      lista.push(
        new FuncionarioModel(
          row["fun_id"],
          row["fun_cpf"],
          row["fun_nome"],
          row["fun_salario"],
          row["fun_datadmissao"],
          row["fun_datademissao"],
          row["car_id"]
        )
      )
    }
    return lista
  }

  async gravar(funcionario) {
    let sql = `insert into tb_funcionario (fun_cpf, fun_nome, fun_salario, fun_datadmissao, car_id)
        values (?, ?, ?, ?, ?)`
    let params = [
      funcionario.cpf,
      funcionario.nome,
      funcionario.salario,
      funcionario.dataAdmissao,
      funcionario.cargo,
    ]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async demitir(id) {
    let sql = `update tb_funcionario set fun_datademissao = curdate() where fun_id = ?`
    let params = [id]
    let result = await this.#banco.ExecutaComandoNonQuery(sql, params)
    return result
  }

  async obter(id) {
    let sql = `select * from tb_funcionario where fun_id = ?`
    let params = [id]
    let rows = await this.#banco.ExecutaComando(sql, params)
    let row = rows[0]
    return new FuncionarioModel(
      row["fun_id"],
      row["fun_cpf"],
      row["fun_nome"],
      row["fun_salario"],
      row["fun_datadmissao"],
      row["fun_datademissao"],
      row["car_id"]
    )
  }
}
