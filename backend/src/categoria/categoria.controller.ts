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
  const { nombre } = req.body;

  try {
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3 || nombre.trim().length > 50) {
      return res.status(400).json({ message: 'El nombre de la categoría es obligatorio y debe tener entre 3 y 50 caracteres.' });
    }

    // Verificar si la categoría ya existe
    const categoriaExistente = await em.findOne(Categoria, { nombre });
    if (categoriaExistente) {
      return res.status(409).json({ message: 'Ya existe una categoría con este nombre.' });
    }

    // Crear y guardar la categoría
    const categoria = em.create(Categoria, { nombre: nombre.trim() });
    await em.flush();

    res.status(201).json({ message: 'Categoría creada con éxito', data: categoria });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);
  const { nombre } = req.body;

  try {
    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID proporcionado no es válido.' });
    }

    // Buscar la categoría existente
    const categoria = await em.findOne(Categoria, { id });
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada.' });
    }

    // Validaciones sobre el nombre
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3 || nombre.trim().length > 50) {
      return res.status(400).json({ message: 'El nombre de la categoría es obligatorio y debe tener entre 3 y 50 caracteres.' });
    }

    // Verificar si ya existe otra categoría con el mismo nombre
    const categoriaExistente = await em.findOne(Categoria, { nombre });
    if (categoriaExistente && categoriaExistente.id !== id) {
      return res.status(409).json({ message: 'Ya existe otra categoría con este nombre.' });
    }

    // Actualizar la categoría
    em.assign(categoria, { nombre: nombre.trim() });
    await em.flush();

    res.status(200).json({ message: 'Categoría actualizada con éxito' });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
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