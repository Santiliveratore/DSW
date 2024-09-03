import { Request, Response, NextFunction } from 'express'

import { Cliente } from './cliente.entity.js'



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

export {findAll, findOne, add, update, remove }
