import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: String

  @column()
  public capacidade: Number

  @column()
  public disponivel: Boolean

  @column()
  public id_prof: Number

  @manyToMany(() => Student, {
    pivotTimestamps: true,
  })
  public alunos: ManyToMany<typeof Student>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
