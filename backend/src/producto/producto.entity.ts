import { Entity,PrimaryKey,Property,ManyToOne } from "@mikro-orm/core"
import { Categoria } from "../categoria/categoria.entity.js"


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

   // @Property()
    //stock!: number

    @Property()
    foto?:string

    @ManyToOne(() => Categoria, { eager: true,fieldName: 'id_categoria' })
    categoria!: Categoria;
    
}
