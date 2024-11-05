import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Usuario } from './usuario.entity.js'
import jwt from 'jsonwebtoken';

const em = orm.em

async function findAll(req: Request, res: Response) {
  try{
    const usuarios = await em.find(Usuario,{})
    res.status(200).json({message:'find all usuarios', data:usuarios})

  } catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req: Request, res: Response) {
   try{
    const id = Number.parseInt(req.params.id)
    const usuario = await em.findOneOrFail(Usuario,{id})
    res.status(200).json({message:'usuario encontrado',data:usuario})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const { email } = req.body;

    // Verificar si el email ya está en uso
    const usuarioExistente = await em.findOne(Usuario, { email });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Crear el nuevo usuario si el email no está en uso
    const usuario = em.create(Usuario, req.body);
    await em.flush();

    res.status(201).json({ message: 'Usuario creado', data: usuario });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const usuario = em.getReference(Usuario,id)
    em.assign(usuario,req.body)
    await em.flush()
    res.status(200).json({message:'usuario actualizado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const usuario = em.getReference(Usuario,id)
    await em.removeAndFlush(usuario)
    res.status(204).send({message:'usuario eliminado'})
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, contraseña } = req.body;

    // Buscar el usuario en la base de datos usando el email
    const usuario = await em.findOne(Usuario, { email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos.
    const contraseñaValida = contraseña === usuario.contraseña;


    if (!contraseñaValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token de autenticación (JWT)
    const token = jwt.sign(
      { id: usuario.id,email: usuario.email, nombre: usuario.nombre ,apellido: usuario.apellido ,rol: usuario.rol,localidad: usuario.localidad }, 
      'clave_secreta',  // Usa una clave secreta fuerte en producción
      { expiresIn: '1h' }  // El token expira en 1 hora
    );

    // Devolver el token al frontend
    res.status(200).json({ message: 'Login exitoso', token});

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export {findAll, findOne, add, update, remove, login }
