import { Router } from 'express'
import { findAll,findOne,add,update,remove } from './producto.controller.js';
import { authenticateToken,verificarAdmin } from '../auth/auth.controller.js';
import multer from 'multer';
import path from 'path';

// Configuración de Multer para guardar la imagen del producto
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve('src/public/productos')); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Nombre único para evitar colisiones
    }
  });

  const upload = multer({ storage });

export const productoRouter = Router()

productoRouter.get('/', findAll)
productoRouter.get('/:id', findOne)
productoRouter.post('/',authenticateToken,verificarAdmin,upload.single('foto'), add)
productoRouter.put('/:id',authenticateToken,verificarAdmin, upload.single('foto'), update)
productoRouter.delete('/:id/:foto',authenticateToken,verificarAdmin, remove)