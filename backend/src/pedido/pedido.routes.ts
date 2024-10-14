import { Router } from 'express'
import { findAll,add,update,remove,findOne, findAllById } from './pedido.controller.js'

export const pedidoRouter = Router()

pedidoRouter.get('/', findAll)
pedidoRouter.get('/filtrar/:id', findAllById)
pedidoRouter.get('/:id', findOne)
pedidoRouter.put('/:id', update)
pedidoRouter.delete('/:id', remove)
pedidoRouter.post('/', add)