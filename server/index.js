const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456123',
  database: 'signowebdb'
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


//Pegar as enquetes finalizadas
app.get('/api/getenquetesf', (req, res) => {
  const sqlInsert = "SELECT enquete.id, enquete.nome, enquete.dataInicio, enquete.dataFinal, enquete.foiIniciada, (SELECT group_concat(CONCAT(' ', opcoes.opcao, ' (',  opcoes.qtdVotos, ')')) FROM opcoes WHERE opcoes.id_enquete = enquete.id GROUP BY (enquete.id)) AS opcoes_votos FROM enquete WHERE foiIniciada = 3";
  db.query(sqlInsert, (err, result) => {
    res.send(result)
  })
})

//Pegar as enquetes inicializadas
app.get('/api/getenquetesi', (req, res) => {
  const sqlInsert = "SELECT enquete.id, enquete.nome, enquete.dataInicio, enquete.dataFinal, enquete.foiIniciada, (SELECT group_concat(CONCAT(' ', opcoes.opcao, ' (',  opcoes.qtdVotos, ')')) FROM opcoes WHERE opcoes.id_enquete = enquete.id GROUP BY (enquete.id)) AS opcoes_votos FROM enquete  WHERE foiIniciada = 1";
  db.query(sqlInsert, (err, result) => {
    res.send(result)
  })
})

//Pegar as enquetes que não foram inicializadas
app.get('/api/getenquetesni', (req, res) => {
  const sqlInsert = "SELECT enquete.id, enquete.nome, enquete.dataInicio, enquete.dataFinal, enquete.foiIniciada, (SELECT group_concat(CONCAT(' ', opcoes.opcao, ' (',  opcoes.qtdVotos, ')')) FROM opcoes WHERE opcoes.id_enquete = enquete.id GROUP BY (enquete.id)) AS opcoes_votos FROM enquete  WHERE foiIniciada = 0";
  db.query(sqlInsert, (err, result) => {
    res.send(result)
  })
})

//Deletar uma enquete
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const sqlInsert = "DELETE FROM enquete WHERE (id = ?);"
  db.query(sqlInsert, [id], (err, res) => {
    console.log(err)
  })
  const sqlDelete2 = "DELETE FROM opcoes WHERE (id_enquete = ?);"
  db.query(sqlDelete2, [id], (err, res) => {
    console.log(err)
  })
})

//Finalizar uma enquete
app.put('/api/update', (req, res) => {
  const id = req.body.id;
  const sqlInsert = "UPDATE enquete SET foiIniciada = 3 WHERE (id = ?);"
  db.query(sqlInsert, [id], (err, res) => {
    console.log(err)
  })
})


//Inserir uma enquete
app.post('/api/insert', async (req, res) => {
  let id;
  const title = req.body.title;
  const dataInicio = req.body.dataInicio;
  const dataFinal = req.body.dataFinal;
  const option = req.body.option;
  const wasInitiated = req.body.wasInitiated;

  const sqlInsert = "INSERT INTO enquete (nome, dataInicio, dataFinal, foiIniciada) VALUES (?, ?, ?, ?);"
  db.query(sqlInsert, [title, dataInicio, dataFinal, wasInitiated], (err, result) => {
    console.log(err);
  })

  const getId = "SELECT id FROM enquete ORDER BY id DESC LIMIT 1;"

  setTimeout(function () {
    db.query(getId, (err, result) => {
      id = result[0].id;

      const sqlInsert2 = "INSERT INTO opcoes (opcao, id_enquete, qtdVotos) VALUES(?, ?, 0)"
      for (let i = 0; i < option.length; i++) {
        db.query(sqlInsert2, [option[i], id], (err, result) => {
          console.log(err);
        })
      }
    })


  }, 1500);

})

app.listen(3001, () => {
  console.log('running on port 3001');
})