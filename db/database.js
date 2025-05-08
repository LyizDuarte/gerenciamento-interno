import mysql from 'mysql2';

export default class Database {
  #pool;
  #conexaoTransacao = null;

  constructor() {
    this.#pool = mysql.createPool({
      host: '127.0.0.1',
      database: 'rh',
      user: 'root',
      password: '13012003',
    });
  }

  get conexao() {
    return this.#conexaoTransacao || this.#pool;
  }

  async AbreTransacao() {
    return new Promise((resolve, reject) => {
      this.#pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.beginTransaction((err) => {
          if (err) return reject(err);
          this.#conexaoTransacao = connection;
          resolve();
        });
      });
    });
  }

  async Commit() {
    return new Promise((resolve, reject) => {
      if (!this.#conexaoTransacao) return reject(new Error("Sem transação ativa"));
      this.#conexaoTransacao.commit((err) => {
        if (err) return reject(err);
        this.#conexaoTransacao.release();
        this.#conexaoTransacao = null;
        resolve();
      });
    });
  }

  async Rollback() {
    return new Promise((resolve, reject) => {
      if (!this.#conexaoTransacao) return reject(new Error("Sem transação ativa"));
      this.#conexaoTransacao.rollback(() => {
        this.#conexaoTransacao.release();
        this.#conexaoTransacao = null;
        resolve();
      });
    });
  }

  async ExecutaComando(sql, valores = []) {
    return new Promise((resolve, reject) => {
      this.conexao.query(sql, valores, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  async ExecutaComandoNonQuery(sql, valores = []) {
    return new Promise((resolve, reject) => {
      this.conexao.query(sql, valores, (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  }

  async ExecutaComandoLastInserted(sql, valores = []) {
    return new Promise((resolve, reject) => {
      this.conexao.query(sql, valores, (err, results) => {
        if (err) reject(err);
        else resolve(results.insertId);
      });
    });
  }
}
