const express = require('express')
const routes = require('./routes')
const path = require('path')

const app = express()
// routes
app.use(routes)
// app.use(express.json())

// ARQUIVO DE CONFIGURAÇÃO DO SWAGGER
const swaggerUI  = require('swagger-ui-express')
// const swaggerDocument = './swagger.json'
const swaggerDocument = require("./swagger.json")

// ROTA PARA A DOCUMENTAÇÃO 
app.use('/docs', 
    swaggerUI.serve, 
    swaggerUI.setup(swaggerDocument)
  ) 

// ROTA DO TERMOS
app.get('/terms', (request, response) =>{
  return response.json({
    message: "Termos de Serviço"
  })
})

app.get('/', (request, response) =>{
  return response.json({
    message: "Projeto - Documentação com Swagger"
  })
})

// usando template engine
app.set('view engine', 'ejs')

// Mudar a localização da pasta views
app.set('views', path.join(__dirname, 'views'))

//habilitar arquivos statics
app.use(express.static('public'))

// usar o req.body
app.use(express.urlencoded({ extended: true }))

// versionamento da documentação
app.use('/v1', routes)

app.listen(process.env.PORT || 3000, () => console.log('Runing Online'))
