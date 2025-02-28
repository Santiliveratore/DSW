import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Localidad } from './localidad.entity.js'
import { error } from 'console'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const localidades = await em.find(Localidad,{})
    res.status(200).json({message:'find all localidades', data:localidades})

  } catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const localidad = await em.findOneOrFail(Localidad,{id})
    res.status(200).json({message:'localidad encontrada',data:localidad})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}
async function add(req: Request, res: Response) {
  const { cod_postal, nombre } = req.body;

  try {
    // Validar código postal
    if (!cod_postal || typeof cod_postal !== 'string' || cod_postal.trim().length < 4 || cod_postal.trim().length > 10) {
      return res.status(400).json({ message: 'El código postal es obligatorio y debe tener entre 4 y 10 caracteres.' });
    }

    // Validar nombre
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 3 || nombre.trim().length > 50) {
      return res.status(400).json({ message: 'El nombre de la localidad es obligatorio y debe tener entre 3 y 50 caracteres.' });
    }

    // Verificar si ya existe una localidad con el mismo código postal o nombre
    const localidadExistente = await em.findOne(Localidad, { $or: [{ cod_postal }, { nombre }] });
    if (localidadExistente) {
      return res.status(409).json({ message: 'Ya existe una localidad con este código postal o nombre.' });
    }

    // Crear y guardar la localidad
    const localidad = em.create(Localidad, { cod_postal: cod_postal.trim(), nombre: nombre.trim() });
    await em.flush();
    
    res.status(201).json({ message: 'Localidad creada con éxito', data: localidad });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar localidad con validaciones
async function update(req: Request, res: Response) {
  const id = Number.parseInt(req.params.id);
  const { cod_postal, nombre } = req.body;

  try {
    // Validar que el ID sea un número válido
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID proporcionado no es válido.' });
    }

    // Buscar la localidad existente
    const localidad = await em.findOne(Localidad, { id });
    if (!localidad) {
      return res.status(404).json({ message: 'Localidad no encontrada.' });
    }

    // Validar código postal
    if (cod_postal && (typeof cod_postal !== 'string' || cod_postal.trim().length < 4 || cod_postal.trim().length > 10)) {
      return res.status(400).json({ message: 'El código postal debe tener entre 4 y 10 caracteres.' });
    }

    // Validar nombre
    if (nombre && (typeof nombre !== 'string' || nombre.trim().length < 3 || nombre.trim().length > 50)) {
      return res.status(400).json({ message: 'El nombre de la localidad debe tener entre 3 y 50 caracteres.' });
    }

    // Verificar si el nuevo código postal o nombre ya existen en otra localidad
    const localidadExistente = await em.findOne(Localidad, { $or: [{ cod_postal }, { nombre }], id: { $ne: id } });
    if (localidadExistente) {
      return res.status(409).json({ message: 'Ya existe otra localidad con este código postal o nombre.' });
    }

    // Actualizar la localidad
    em.assign(localidad, { cod_postal: cod_postal?.trim(), nombre: nombre?.trim() });
    await em.flush();

    res.status(200).json({ message: 'Localidad actualizada con éxito' });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const localidad = em.getReference(Localidad,id)
    await em.removeAndFlush(localidad)
    res.status(204).send({message:'localidad eliminada'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

export {findAll, findOne, add, update, remove }