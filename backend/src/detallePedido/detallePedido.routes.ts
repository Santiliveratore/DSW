import { Router } from 'express'
import { findAll,findOne,add,update,remove } from './detallePedido.controller.js'
import { authenticateToken,verificarAdmin } from '../auth/auth.controller.js'

export const detallePedidoRouter = Router()

detallePedidoRouter.get('/',authenticateToken, findAll)
detallePedidoRouter.get('/:id',authenticateToken, findOne)
detallePedidoRouter.post('/',authenticateToken, add)
detallePedidoRouter.put('/:id', authenticateToken,update)
detallePedidoRouter.delete('/:id',authenticateToken, remove)
