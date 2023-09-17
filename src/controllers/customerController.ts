import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { CustomerService } from "./../services/customer.service";

import authConfig from "./../config/auth.json";

const router = express.Router();
const customerController = router;
const customerService = new CustomerService();

router.post("", async (req, res) => {
  const body = req.body;
  const token = req.headers.authorization?.split(" ")[1] || "";
  const isVerified = token ? jwt.verify(token, authConfig.secret) : false;

  if (isVerified) {
    try {
      if (await customerService.findByDocumentNumber(body.documentNumber))
        return res.status(400).send({
          error: "CLiente Já Cadastrado",
        });

      req.body.updatedBy = "";

      const customer = await customerService.create(req.body);

      return res.status(201).send({
        message: "Cliente Cadastrado Com Sucesso.",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        error: "Falha no Cadastro",
      });
    }
  } else {
    return res.status(400).send({
      error: "Token Inválido",
    });
  }
});

router.get("/findAll", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  console.log(token);
  const isVerified = token ? jwt.verify(token, authConfig.secret) : false;
  console.log(isVerified);

  if (isVerified) {
    try {
      const customers = await customerService.findAll();
      return res.status(200).send(customers);
    } catch (err) {
      return res.status(400).send({
        error: "Falha ao Buscar Clientes",
      });
    }
  } else {
    return res.status(400).send({
      error: "Token Inválido",
    });
  }
});

/* router.post("/authenticate", async (req, res) => {
  const { input, password } = req.body;

  const user = await userService.findByEmailOrNickname(input);

  if (!user)
    return res.status(400).send({
      error: "Conta Não Encontrada",
    });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({
      error: "Senha Inválida",
    });

  user.password = "";

  const token = jwt.sign(
    {
      id: user.id,
    },
    authConfig.secret,
    {
      expiresIn: 86400,
    }
  );

  res.send({
    user,
    token,
  });
});
 */
export default customerController;
