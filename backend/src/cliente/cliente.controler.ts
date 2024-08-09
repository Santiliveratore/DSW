import { Request, Response, NextFunction } from 'express'
import { ClienteRepository } from './cliente.repository.js'
import { Cliente } from './cliente.entity.js'

const repository = new ClienteRepository()

function sanitizeClienteInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    apellido: req.body.apellido,
    dni: req.body.dni,
    email: req.body.email
    
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
  const id = req.params.id
  const cliente = repository.findOne({ id })
  if (!cliente) {
    return res.status(404).send({ message: 'Cliente not found' })
  }
  res.json({ data: cliente })
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const clienteInput = new Cliente(
    input.name,
    input.apellido,
    input.email,
    input.dni
  )

  const cliente = repository.add(clienteInput)
  return res.status(201).send({ message: 'Cliente created', data: cliente })
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id
  const cliente = repository.update(req.body.sanitizedInput)

  if (!cliente) {
    return res.status(404).send({ message: 'Cliente not found' })
  }

  return res.status(200).send({ message: 'Cliente updated successfully', data: cliente })
}

function remove(req: Request, res: Response) {
  const id = req.params.id
  const cliente = repository.delete({ id })

  if (!cliente) {
    res.status(404).send({ message: 'Cliente not found' })
  } else {
    res.status(200).send({ message: 'Cliente deleted successfully' })
  }
}

export { sanitizeClienteInput, findAll, findOne, add, update, remove }
