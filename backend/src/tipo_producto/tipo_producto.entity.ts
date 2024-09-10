import { Entity,PrimaryKey,Property } from "@mikro-orm/core"


@Entity()
export class Tipo_producto {

    @PrimaryKey()  
    id?: number

    @Property()
    descripcion!: string
    
}
