import { Entity,PrimaryKey,Property,OneToMany,Collection } from "@mikro-orm/core"
import { Producto } from "../producto/producto.entity.js";


@Entity()
export class Tipo_producto {

    @PrimaryKey()  
    id?: number

    @Property()
    descripcion!: string

    @OneToMany(() => Producto, producto => producto.tipo)
    productos = new Collection<Producto>(this);
    
}
