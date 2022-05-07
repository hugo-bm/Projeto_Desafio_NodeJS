import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public numero: String

  @column()
  public capacidade: Number

  @column()
  public disponivel: Boolean

  @column({ serializeAs: null })
  public id_prof: Number

  @manyToMany(() => Student, {
    pivotTimestamps: true,
  })
  public alunos: ManyToMany<typeof Student>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
