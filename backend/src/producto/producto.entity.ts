import { Entity,PrimaryKey,Property } from "@mikro-orm/core"


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

    //@Property()
    //id_categoria!:number

    @Property({nullable:true})
    foto?:string
    
}
