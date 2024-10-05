import { Entity,PrimaryKey,Property,OneToMany,Collection } from "@mikro-orm/core"
import { Producto } from "../producto/producto.entity.js";


@Entity()
export class Categoria {

    @PrimaryKey()  
    id?:number

    @Property()
    nombre!: string

    @OneToMany(() => Producto, producto => producto.categoria)
    productos = new Collection<Producto>(this);
    
}
