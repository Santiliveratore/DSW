import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Producto } from './producto.entity.js'
import { error } from 'console'
import fs from 'fs';
import path from 'path';

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const { categoria } = <any>req.query; // Obtiene el parámetro de categoría de la consulta

    // Si se proporciona una categoría, busca solo los productos de esa categoría
    // Si no se proporciona, busca todos los productos
    const productos = await em.find(Producto, categoria ? { categoria: categoria } : {});

    res.status(200).json({ message: 'fin all productos', data: productos });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
  const em = orm.em.fork(); // Clonamos el EntityManager para este contexto hice esto porque me daba un error
  try {
    const id = Number.parseInt(req.params.id);
    const producto = await em.findOneOrFail(Producto, id);

    // Si se envía una nueva foto, manejamos la eliminación de la antigua
    if (req.file) {
      const oldFoto = producto.foto; 

      em.assign(producto, req.body);
      producto.foto = req.file.filename; // Actualizamos la foto con la nueva

      // Eliminar la foto antigua
      if (oldFoto) {
        const oldFilePath = path.join(path.resolve('src/public/productos/'), oldFoto);
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error(`Error al eliminar el archivo: ${oldFilePath}`, err);
          }
        });
      }
    } else {
      // Si no hay nueva foto, simplemente actualizamos los datos
      em.assign(producto, req.body);
    }

    await em.flush(); // Guardamos los cambios en la base de datos
    res.status(200).json({ message: 'Producto actualizado' });
  } catch (error: any) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: error.message });
  }
}



async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);

    // Busca el producto en la base de datos para obtener la información de la imagen
    const producto = await em.findOneOrFail(Producto, id);

    // Obtener el nombre de la imagen del producto
    const imagePath = path.join(path.resolve('src/public/productos/'), req.params.foto);

    // Elimina el producto de la base de datos
    await em.removeAndFlush(producto);

    // Verifica si la imagen existe en la carpeta y la elimina
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error al eliminar la imagen:', err);
      } else {
        console.log('Imagen eliminada:', producto.foto);
      }
    });

    res.status(204).send({ message: 'Producto eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {findAll, findOne, add, update, remove }