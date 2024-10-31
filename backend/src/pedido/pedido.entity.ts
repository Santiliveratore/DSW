import { Collection, Entity,ManyToOne,OneToMany,PrimaryKey,Property,Cascade } from "@mikro-orm/core"
import { Usuario } from "../usuario/usuario.entity.js";
import { DetallePedido } from "../detallePedido/detallePedido.entity.js";


@Entity()
export class Pedido {

    @PrimaryKey()  
    id?:number

    @Property()
    fecha!: Date

    @Property()
    monto!: number

    @Property()
    estado!: string

    @ManyToOne(() => Usuario,{eager: true,fieldName: 'id_usuario' })
    usuario!: Usuario;

    @OneToMany(() => DetallePedido, detallePedido => detallePedido.pedido, { cascade: [Cascade.REMOVE] })
    detalles = new Collection<DetallePedido>(this);
}