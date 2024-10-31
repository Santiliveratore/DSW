import { Entity,PrimaryKey,Property,ManyToOne } from "@mikro-orm/core"
import { Categoria } from "../categoria/categoria.entity.js"
import { Tipo_producto } from "../tipo_producto/tipo_producto.entity.js"


@Entity()
export class Producto {

    @PrimaryKey()  
    id?:number

    @Property()
    nombre!: string

    @Property()
    descripcion!: string

    @Property()
    precio!: number

    @Property()
    foto?:string

    @ManyToOne(() => Categoria, { eager: true,fieldName: 'id_categoria' })
    categoria!: Categoria;

    @ManyToOne(() => Tipo_producto, { eager: true,fieldName: 'id_tipo_producto' })
    tipo!: Tipo_producto;
    
}
