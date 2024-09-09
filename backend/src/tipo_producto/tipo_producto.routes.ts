import { Router } from 'express'
import { findAll,findOne,add,update,remove } from './tipo_producto.controller.js'

export const tipo_productoRouter = Router()

tipo_productoRouter.get('/', findAll)
tipo_productoRouter.get('/:id', findOne)
tipo_productoRouter.post('/', add)
tipo_productoRouter.put('/:id', update)
tipo_productoRouter.delete('/:id', remove)
