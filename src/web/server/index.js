const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Outros middlewares e configurações do servidor
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Iniciar o servidor na porta 8081
const port = 8081;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
