import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Categoria } from './categoria.entity.js'
import { error } from 'console'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const categorias = await em.find(Categoria,{})
    res.status(200).json({message:'find all categorias', data:categorias})

  } catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const categoria = await em.findOneOrFail(Categoria,{id})
    res.status(200).json({message:'categoria encontrada',data:categoria})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req: Request, res: Response) {
  try{
    const categoria = em.create(Categoria,req.body)
    await em.flush()
    res.status(201).json({message:'categoria creada',data:categoria})

  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const categoria = em.getReference(Categoria,id)
    em.assign(categoria,req.body)
    await em.flush()
    res.status(200).json({message:'categoria actualizada'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const categoria = em.getReference(Categoria,id)
    await em.removeAndFlush(categoria)
    res.status(204).send({message:'categoria eliminada'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

export {findAll, findOne, add, update, remove }