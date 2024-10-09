import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Detalle_pedido } from './detalle_pedido.entity.js'
import { error } from 'console'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const detalle_pedidos = await em.find(Detalle_pedido,{})
    res.status(200).json({message:'find all detalle_pedidos', data:detalle_pedidos})

  } catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const detalle_pedido = await em.findOneOrFail(Detalle_pedido,{id})
    res.status(200).json({message:'detalle_pedido encontrado',data:detalle_pedido})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req: Request, res: Response) {
  try{
    const detalle_pedido = em.create(Detalle_pedido,req.body)
    await em.flush()
    res.status(201).json({message:'detalle_pedido creado',data:detalle_pedido})

  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const detalle_pedido = em.getReference(Detalle_pedido,id)
    em.assign(detalle_pedido,req.body)
    await em.flush()
    res.status(200).json({message:'detalle_pedido actualizado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const detalle_pedido = em.getReference(Detalle_pedido,id)
    await em.removeAndFlush(detalle_pedido)
    res.status(204).send({message:'detalle_pedido eliminado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

export {findAll, findOne, add, update, remove }
