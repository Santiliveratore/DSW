import 'reflect-metadata'
import express from 'express'
import { orm } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { usuarioRouter } from './usuario/usuario.routes.js'
import { productoRouter } from './producto/producto.routes.js'
import { tipo_productoRouter } from './tipo_producto/tipo_producto.routes.js'
import { categoriaRouter } from './categoria/categoria.routes.js'
import { pedidoRouter } from './pedido/pedido.routes.js'

import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())

// codigo para permitir que se acceda a la api desde el servidor frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



// Servir la carpeta 'public/productos' como estática
app.use(cors()); //habilitar unas restricciones del navegador
app.use('/productos', express.static(path.join(__dirname, '../src/public/productos')));





app.use((req,res,next)=>{
  RequestContext.create(orm.em, next)
})


app.use('/api/productos',productoRouter)
app.use('/api/usuarios', usuarioRouter)
app.use('/api/categorias',categoriaRouter)
app.use('/api/tipo_productos',tipo_productoRouter)
app.use('/api/pedidos',pedidoRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})



app.listen(3000, () => {
  console.log(path.join(__dirname, '../src/public/productos'));
  console.log('Server runnning on http://localhost:3000/')
  
})
