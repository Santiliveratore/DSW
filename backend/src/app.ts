import 'reflect-metadata'
import express from 'express'
import { clienteRouter } from './cliente/cliente.routes.js'
import { orm } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { productoRouter } from './producto/producto.routes.js'
import { tipo_productoRouter } from './tipo_producto/tipo_producto.routes.js'
import { categoriaRouter } from './categoria/categoria.routes.js'

const app = express()
app.use(express.json())


app.use((req,res,next)=>{
  RequestContext.create(orm.em, next)
})

app.use('/api/categorias',categoriaRouter)
app.use('/api/tipo_productos',tipo_productoRouter)
app.use('/api/productos',productoRouter)
app.use('/api/clientes', clienteRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})



app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
