# Propuesta TP DSW

## Grupo
### Integrantes
* 47889 - Liveratore, Santiago Nicolas
* 50689 - Lopez Carignano, Agustin
* 50727 - Bertero, Juan Manuel

### Repositorios
* [frontend app](https://github.com/Santiliveratore/DSW/tree/main/frontend/SuperUTN)
* [backend app](https://github.com/Santiliveratore/DSW/tree/main/backend)


## Tema Supermercado Web
### Descripción
*El negocio en desarrollo es un sistema para un supermercado que optimiza la gestión de productos, pedidos y el proceso de compra en línea, con funcionalidades específicas para un carrito de compras que permite a los clientes seleccionar y gestionar sus productos antes de finalizar su pedido. Esto facilita tanto la administración de inventarios como una experiencia de compra fluida y conveniente para los usuarios.*

### Modelo
![imagen del modelo]()

*Nota*: incluir un link con la imagen de un modelo, puede ser modelo de dominio, diagrama de clases, DER. Si lo prefieren pueden utilizar diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional 

### 1. Gestión de productos
El administrador puede:
- Agregar, editar y eliminar productos.
- Organizar productos en categorías y tipos para mejorar la estructura y la facilidad de búsqueda.

### 2. Carrito de compras
Los clientes pueden:
- Agregar productos al carrito de compras.
- Ver el total de la compra.
- Ajustar la cantidad de cada producto antes de finalizar el pedido.

### 3. Gestión de pedidos
Los clientes pueden:
- Crear y revisar sus pedidos.
- Eliminar pedidos antes de su procesamiento.
  
El administrador puede:
- Acceder a todos los pedidos realizados.
- Actualizar el estado de los pedidos para facilitar el seguimiento y control.

### 4. Interfaz de usuario
El sistema cuenta con:
- Una interfaz para los administradores, enfocada en la gestión de productos, categorías y pedidos.
- Una interfaz para los clientes, orientada a la navegación, selección de productos y gestión del carrito de compras.


|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Tipo Producto<br>2. CRUD Categoria<br>3. CRUD Localidad|
|CRUD dependiente|1. CRUD Producto {depende de} CRUD Tipo Producto y Categoria<br>2. CRUD Usuario {depende de} CRUD Localidad|
|CUU/Epic|1. Realizar un pedido con su lista de productos<br>2. Admin marca los pedidos como entregados<br>3. Cliente cancela sus pedidos
