import { Router } from 'express'
import { findAll,add,update,remove,findOne, findAllById } from './pedido.controller.js'
import { verificarAdmin,authenticateToken } from '../auth/auth.controller.js'

export const pedidoRouter = Router()

pedidoRouter.get('/',authenticateToken,verificarAdmin, findAll)
pedidoRouter.get('/filtrar/:id',authenticateToken, findAllById)
pedidoRouter.get('/:id', authenticateToken,verificarAdmin,findOne)
pedidoRouter.put('/:id',authenticateToken,verificarAdmin, update)
pedidoRouter.delete('/:id',authenticateToken,remove)
pedidoRouter.post('/',authenticateToken, add)