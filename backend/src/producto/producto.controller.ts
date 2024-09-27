import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Producto } from './producto.entity.js'
import { error } from 'console'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const productos = await em.find(Producto,{})
    res.status(200).json({message:'fin all productos', data:productos})

  } catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const producto = await em.findOneOrFail(Producto,{id})
    res.status(200).json({message:'producto encontrado',data:producto})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    // Verifica si el archivo fue subido
    if (!req.file) {
      return res.status(400).json({ message: 'La imagen es requerida' });
    }

    // Crea el producto utilizando el cuerpo de la solicitud y el nombre de la imagen
    const producto = em.create(Producto, {
      ...req.body,
      foto: req.file.filename, // Guarda solo el nombre del archivo
    });

    await em.flush(); // Guarda el producto en la base de datos

    res.status(201).json({ message: 'Producto creado', data: producto });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const producto = em.getReference(Producto,id)
    em.assign(producto,req.body)
    await em.flush()
    res.status(200).json({message:'producto actualizado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const producto = em.getReference(Producto,id)
    await em.removeAndFlush(producto)
    res.status(204).send({message:'producto eliminado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

export {findAll, findOne, add, update, remove }