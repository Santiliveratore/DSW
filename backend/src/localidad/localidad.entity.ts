import { Entity, PrimaryKey, OneToMany, Collection, Property } from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";

@Entity()
export class Localidad {
  @PrimaryKey()
  id?: number

  @Property()
  cod_postal!: number

  @Property()
  nombre!: string

  @OneToMany(() => Usuario, usuario => usuario.localidad)
  usuarios = new Collection<Usuario>(this);
}