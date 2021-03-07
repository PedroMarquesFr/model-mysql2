const express = require("express");
const User = require("../model/User");
const factoryUser = User();

const routerPost = express.Router();

routerPost.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!factoryUser.isValid(first_name, last_name, email, password))
    return res.status(401).json({ message: "dados incorretos" });
  await factoryUser.create(first_name, last_name, email, password);
  res.status(201).json({ message: "usuario registrado" });
});

routerPost.get("/", async (req, res) => {
  const resp = await factoryUser.getAll();
  res.status(201).json(resp);
});

routerPost.get("/:id", async (req, res) => {
  const resp = await factoryUser.getById(parseInt(req.params.id));
  if (resp.length === 0)
    return res.status(404).json({ message: "Usuário não encontrado" });
  res.status(201).json(resp[0]);
});

routerPost.put("/:id", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (
    !factoryUser.isValid(first_name, last_name, email, password) ||
    !req.params.id
  )
    return res.status(200).json({ message: "Dados inválidos" });
  await factoryUser.update(
    parseInt(req.params.id),
    first_name,
    last_name,
    email,
    password
  );
  res.status(201).json({ message: "Usuário editado com sucesso" });
});

routerPost.delete("/:id", async (req, res) => {
  if (!req.params.id)
    return res.status(200).json({ message: "Dados inválidos" });

  await factoryUser
    .delete(req.params.id)
    .then(res.status(200).json({ message: "Usuário deletado com sucesso" }));
});

module.exports = routerPost;
