import { Entity,PrimaryKey,Property } from "@mikro-orm/core"


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

    
    
  
}
