import express from "express";
import db from "../repository/index.js";

const app = express();

app.use(express.json());

app.post("/api/v1/lista", (req, res) => {
  const id = Number(req.body.id);
  const descricao = req.body.descricao;
  const data = req.body.data;
  const concluido = false;

  if (!id || !descricao || !data) {
    return res.send({ message: "Envie todos os campos" });
  }

  if (Number.isNaN(new Date(data).getTime())) {
    return res.send({ message: "Data inválida" });
  }

  if (db.find((i) => i.id === id)) {
    return res.send({ message: "Já existe um item com esse id" });
  }

  db.push({ id, descricao, data, concluido });

  res.send({
    message: `Lista criada com sucesso. \n\n Suas informações: id: ${id}, descrição: ${descricao}, data: ${data}, concluido: ${concluido}`,
  });
});

app.get("/api/v1/lista", (req, res) => {
  const { concluido } = req.query;

  if (concluido === undefined) {
    return res.send(db);
  }

  const filtrados = db.filter((i) => String(i.concluido) === concluido);

  res.send(filtrados);
});

app.get("/api/v1/lista/pendentes", (req, res) => {
  const pendentes = db.filter((i) => !i.concluido);

  res.send(pendentes);
});

app.get("/api/v1/lista/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = db.find((i) => i.id === id);

  if (!item) {
    return res.send({ message: "Não encontrado" });
  }

  res.send(item);
});

app.put("/api/v1/lista/:id", (req, res) => {
  const id = Number(req.params.id);
  const { descricao, data, concluido } = req.body;

  const item = db.find((i) => i.id === id);

  if (!item) {
    return res.send({ message: "Não encontrado" });
  }

  if (data !== undefined && Number.isNaN(new Date(data).getTime())) {
    return res.send({ message: "Data inválida" });
  }

  if (descricao !== undefined) item.descricao = descricao;
  if (data !== undefined) item.data = data;
  if (concluido !== undefined) item.concluido = concluido;

  res.send({ message: "Item alterado com sucesso", item });
});

app.put("/api/v1/lista/:id/concluido", (req, res) => {
  const id = Number(req.params.id);

  const item = db.find((i) => i.id === id);

  if (!item) {
    return res.send({ message: "Não encontrado" });
  }

  item.concluido = !item.concluido;

  res.send({
    item,
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
