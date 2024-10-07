import { Entity,PrimaryKey,Property } from "@mikro-orm/core"


@Entity()
export class Pedido {

    @PrimaryKey()  
    id?:number

    @Property()
    monto!: number

    @Property()
    fecha!: Date

    //@Property()
    //usuario!: 

}