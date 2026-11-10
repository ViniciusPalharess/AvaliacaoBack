import express from "express";

const app = express();

app.use(express.json());

app.post("", (req, res) => {});

app.get("", (req, res) => {});

app.put("", (req, res) => {});

app.delete("", (req, res) => {});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
