import { Entity,ManyToOne,PrimaryKey,Property} from "@mikro-orm/core"
//import { Pedido } from "../pedido/pedido.entity.js";
import { Producto } from "../producto/producto.entity.js";

// Usa una clase intermediaria
let PedidoClass:any;

@Entity()
export class DetallePedido {

    @PrimaryKey()  
    id?:number

    @Property()
    cantidad!:number

    @ManyToOne(() => Producto,{ eager: true,fieldName: 'id_producto' })
    producto!: Producto;

    @ManyToOne(() => PedidoClass, { eager: true, fieldName: 'id_pedido' })
    pedido!: any;
    
}
// Después del bloque de código, carga la clase
import('../pedido/pedido.entity.js').then(mod => {
    PedidoClass = mod.Pedido;
});