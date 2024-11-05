import { Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Pedido } from './pedido.entity.js'
import { DetallePedido } from '../detallePedido/detallePedido.entity.js'
import { error } from 'console'
import { Usuario } from '../usuario/usuario.entity.js'
import { Producto } from '../producto/producto.entity.js'

const em = orm.em

async function add(req: Request, res: Response) {
  const { lineas, usuarioId } = req.body;

  try {
    // Iniciar una transacción
    await em.begin();

    // Obtener el usuario
    const usuario = await em.findOne(Usuario, { id: usuarioId });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear un nuevo pedido
    const pedido = new Pedido();
    pedido.usuario = usuario;
    pedido.fecha = new Date();
    pedido.estado = 'Pendiente';
    pedido.monto = 0; 

    // Insertar el pedido
    await em.persist(pedido);

    let montoTotal = 0;

    // Crear las líneas de pedido y calcular el monto total
    for (const linea of lineas) {
      const producto = await em.findOne(Producto, { id: linea.productoId });
      if (!producto) {
        // Si un producto no se encuentra, revertimos la transacción
        await em.rollback();
        return res.status(404).json({ message: `Producto con ID ${linea.productoId} no encontrado` });
      }

      const nuevoDetalle = new DetallePedido();
      nuevoDetalle.producto = producto;
      nuevoDetalle.cantidad = linea.cantidad;
      nuevoDetalle.pedido = pedido;

      // Calcular el subtotal para esta línea
      const subtotalLinea = producto.precio * linea.cantidad;
      montoTotal += subtotalLinea; // Sumar el subtotal al monto total
      em.persist(nuevoDetalle);
    }

    // Asignar el monto total al pedido
    pedido.monto = montoTotal;

    // Hacer flush una sola vez para todo el pedido y sus líneas
    await em.flush();

    // Finalizar la transacción
    await em.commit();

    return res.status(201).json({ message: 'Pedido creado exitosamente', pedidoId: pedido.id });
  } catch (error) {
    // Si ocurre un error, revertimos la transacción
    await em.rollback();
    return res.status(500).json({ message: 'Error al crear el pedido', error });
  }
}



async function findAll(req: Request, res: Response) {
  try {
    const pedidos = await em.find(Pedido, {}, { orderBy: { fecha: 'DESC' },populate: ['detalles.producto'] });
    res.status(200).json({ message: 'find all pedidos', data: pedidos });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


async function findAllById(req: Request, res: Response) {
  const usuarioId = Number(req.params.id); // Asegúrate de que sea un número

  try {
    const pedidos = await em.find(Pedido, { usuario: { id: usuarioId } }, { orderBy: { fecha: 'DESC' },populate: ['detalles.producto'] });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error });
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
    console.error('Error al crear el pedido:', error);
    res.status(500).json({message:error.message})
  }
}




export {findAll,findAllById, findOne, add, update, remove}