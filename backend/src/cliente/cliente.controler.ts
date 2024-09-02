import { Request, Response, NextFunction } from 'express'

import { Cliente } from './cliente.entity.js'

//const repository = new ClienteRepository()

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
  res.status(500).json({ message:'Not implemented' })
}

function findOne(req: Request, res: Response) {
  res.status(500).json({ message:'Not implemented' })
}

function add(req: Request, res: Response) {
  res.status(500).json({ message:'Not implemented' })
}

function update(req: Request, res: Response) {
  res.status(500).json({ message:'Not implemented' })
}

function remove(req: Request, res: Response) {
  res.status(500).json({ message:'Not implemented' })
}

export { sanitizeClienteInput, findAll, findOne, add, update, remove }
