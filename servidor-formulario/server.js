// Importa o framework Express
const express = require("express");
// Importa o body-parser para tratar dados de formulários POST
const bodyParser = require("body-parser");

const path = require('path')

const app = express();
const port = 3000;

// Configura o body-parser para ler dados do corpo da requisição (Mudei pra Json.)
app.use(bodyParser.json());

// Servir arquivos estáticos (como o HTML dos formulários)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.post("/calcular-media", (req, res) => {
  
  const { nota1, nota2 } = req.body;
  const num1 = parseFloat(nota1);
  const num2 = parseFloat(nota2);
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ 
      situacao: 'Erro: As notas devem ser números válidos.', 
      media: 'N/A' 
    });
  }

  const media = (num1 + num2) / 2;

  let situacao = '';
  if (media >= 6) {
    situacao = 'Aprovado';
  } else if (media >= 2) {
    situacao = 'Exame Final';
  } else {
    situacao = 'Reprovado';
  }

  res.json({
    situacao: situacao,
    media: media.toFixed(1) 
  });

});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});