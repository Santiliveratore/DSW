
import { Entity,PrimaryKey,Property,OneToMany,Collection } from "@mikro-orm/core"
import { Usuario } from "../usuario/usuario.entity.js"


@Entity()
export class Localidad {

    @PrimaryKey()  
    id?:number

    @Property()
    cod_postal!: string

    @Property()
    nombre!: string

    @OneToMany(() => Usuario, usuario => usuario.localidad)
    usuarios = new Collection<Usuario>(this);

}