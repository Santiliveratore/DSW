import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Pedido } from './pedido.entity.js'
import { error } from 'console'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const pedido = await em.find(Pedido,{})
    res.status(200).json({message:'find all pedidos', data:pedido})

  } catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const pedido = await em.findOneOrFail(Pedido,{id})
    res.status(200).json({message:'pedido encontrado',data:pedido})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req: Request, res: Response) {
  try{
    const pedido = em.create(Pedido,req.body)
    await em.flush()
    res.status(201).json({message:'pedido creado',data:pedido})

  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const pedido = em.getReference(Pedido,id)
    em.assign(pedido,req.body)
    await em.flush()
    res.status(200).json({message:'pedido actualizado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const pedido = em.getReference(Pedido,id)
    await em.removeAndFlush(pedido)
    res.status(204).send({message:'pedido eliminado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

export {findAll, findOne, add, update, remove }