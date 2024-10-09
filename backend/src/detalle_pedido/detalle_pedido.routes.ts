import { Router } from 'express'
import { findAll,findOne,add,update,remove } from './detalle_pedido.controller.js'

export const detalle_pedidoRouter = Router()

detalle_pedidoRouter.get('/', findAll)
detalle_pedidoRouter.get('/:id', findOne)
detalle_pedidoRouter.post('/', add)
detalle_pedidoRouter.put('/:id', update)
detalle_pedidoRouter.delete('/:id', remove)
