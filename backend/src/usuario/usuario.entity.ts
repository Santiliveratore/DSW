import { Entity,PrimaryKey,Property, ManyToOne } from "@mikro-orm/core"
import { Localidad } from "../localidad/localidad.entity.js"


@Entity()
export class Usuario {

    @PrimaryKey()  
    id?:number

    @Property()
    nombre!: string

    @Property()
    apellido!: string

   // @Property()
    // dni!: number

    @Property()
    email!:string

    @Property()
    contraseña!:string

    @Property()
    rol!:string

    //@Property()
    //foto?:string

    //relacion con localidad 
    @ManyToOne(() => Localidad, { eager: true,fieldName: 'id_localidad' })
    localidad!: Localidad;
    
  
}
