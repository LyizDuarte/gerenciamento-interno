import AuthMiddleware from "../middlewares/authMiddleware.js"
import UsuarioModel from "../models/usuarioModel.js"

export default class AutenticacaoController {
  async token(req, res) {
    let { email, senha } = req.body
    if (email && senha) {
      let usuarioModel = new UsuarioModel()
      let usuario = await usuarioModel.login(email, senha)
      if (usuario) {
        let auth = new AuthMiddleware()
        let token = await auth.gerarToken(
          usuario.id,
          usuario.nome,
          usuario.email,
          usuario.senha
        )
        return res.status(200).json({ token })
      } else {
        res
          .status(400)
          .json({ msg: "Credenciais incorretas! Verifique o RA/Senha" })
      }
    } else {
      res.status(400).json({ msg: "Parametros RA/Senha incorretos!" })
    }
  }
}
