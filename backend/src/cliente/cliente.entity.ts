import { Entity,PrimaryKey,Property } from "@mikro-orm/core"


@Entity()
export class Cliente {

    @PrimaryKey()  
    id?:number

    @Property()
    name!: string

    @Property()
    apellido!: string

    @Property()
    dni!: number

    @Property()
    email!:string
    
  
}
