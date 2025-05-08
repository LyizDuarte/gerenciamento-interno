import jwt from "jsonwebtoken"
import UsuarioModel from "../models/usuarioModel.js"
var SECRET = "COR1NTH14N5"

export default class AuthMiddleware {
  gerarToken(id, nome, email, senha) {
    return jwt.sign(
      {
        id: id,
        nome: nome,
        email: email,
        senha: senha
      },
      SECRET,
      { expiresIn: 18000 }
    )
  }

  async validar(req, res, next) {
    if (req.headers.authorization == null) {
      return res.status(401).json({ msg: "Token de acesso não foi enviado" })
    }
    let token = req.headers["authorization"].split(" ")[1]
    if (token) {
      let usuarioToken = jwt.verify(token, SECRET)
      let usuarioModel = new UsuarioModel()
      let usuario = await usuarioModel.obterCompleto(usuarioToken.id)
      if (usuario) {
        req.usuarioLogado = usuario[0]
        next()
      } else {
        res.status(401).json({ msg: "Não autorizado" })
      }
    } else {
      res.status(401).json({ msg: "Não autorizado" })
    }
  }
}
