import { Router } from 'express'
import { findAll,findOne,add,update,remove } from './categoria.controller.js'
import { authenticateToken,verificarAdmin } from '../auth/auth.controller.js'

export const categoriaRouter = Router()

categoriaRouter.get('/', findAll)
categoriaRouter.get('/:id', findOne)
categoriaRouter.post('/',authenticateToken,verificarAdmin, add)
categoriaRouter.put('/:id',authenticateToken,verificarAdmin, update)
categoriaRouter.delete('/:id',authenticateToken,verificarAdmin, remove)