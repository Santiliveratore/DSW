import crypto from 'node:crypto'

export class Cliente {
  constructor(
    public name: string,
    public apellido: string,
    public dni: number,
    public email:string,
    public id = crypto.randomUUID()
  ) {}
}
