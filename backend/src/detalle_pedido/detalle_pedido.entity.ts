import { Entity,PrimaryKey,Property} from "@mikro-orm/core"


@Entity()
export class Detalle_pedido {

    @PrimaryKey()  
    id?:number

    @Property()
    cantidad!:number

    @Property()
    id_producto!:number

    @Property()
    id_pedido!:number
    
}
