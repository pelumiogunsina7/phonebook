//const { json } = require('express')
const express = require('express')
const cors = require('cors')
//const http =require('http')
//const { type } = require('os')
const app = express()
const logger = require('morgan')
app.use(express.json())
app.use(logger('tiny'))
app.use(cors())
const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
      "id": 5,
      "name": "A Hellas",
      "number": "081-12-3456453"
    }
]

/* const app = http.createServer((respoense, request) =>{
    response.writeHead(200, {'content-Type':'application/json'})
    response.end(JSON.stringify(persons))
}) */

app.get('/', (req, res) =>{
    res.send("<h1>Phonebooks</h1>")
  })

 
  app.get('/api/persons', (req, res) =>{
   res.json(persons)
  })


  app.get('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    const person = persons.find(n => n.id === id)
    if(!person){
      res.status(404).send(`Contact with ID ${id} is not found`)
    }else{
      res.json(person)
    }
  })

const info = (req, res, next) =>{
  const date = new Date()
  const len = `<h3>Phonebook has info for ${persons.length} people </br> ${date}</h3>`
  
  res.send(len)
  
}

  app.get('/api/info', (req, res, ) =>{
    const date = new Date()
    const info = `<h3>Phonebook has info for ${persons.length} people </br></br> ${date}</h3>`
    res.send(info)
  })
   
   
  app.delete('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    const persons = persons.filter(n => n.id !== id)
    res.json(persons)
    res.status(204).end()
    
  })  
  

  app.post('/api/persons/', (req, res,) =>{
    const body = req.body
    /* const name = req.body.name
    const number =req.body.number */
    const nameEqual = persons.some((p) =>JSON.stringify(p.name)  === JSON.stringify(body.name))
    if(!body.name){
      return res.status(404).json({
        error: "contact not found"
      })
    }
    if(!body.number){
      return res.status(404).json({
        error: "Phone number is missing"
      })
    }
    if(nameEqual){
      return res.status(404).json({
        error: "Name must be Unique"
      })
    }
    const person ={
      id: persons.length?Math.floor(Math.random() * 10000):1,
      name:body.name,
      number:body.number
  }
  logger(('tiny'), console.log(person))
   res.json((person))
  

   
  })

const PORT = process.env.port || 9002
app.listen(PORT, () => console.log(`server running on port ${PORT}`))