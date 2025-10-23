document.getElementById('formnotas').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nota1 = parseFloat(event.target.nota1.value);
  const nota2 = parseFloat(event.target.nota2.value);

  const resposta = await fetch('/calcular-media', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({ nota1, nota2 })
});

  const dados = await resposta.json();
  document.getElementById('resultado').textContent = 
  `Situaçao: ${dados.situacao} (Média: ${dados.media})`;
});