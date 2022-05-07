import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classrooms extends BaseSchema {
  protected tableName = 'classrooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('numero').notNullable().unique()
      table.integer('capacidade').notNullable()
      table.boolean('disponivel').notNullable()
      table.integer('id_prof').notNullable()
      table.foreign('id_prof').references('teachers.id').onDelete('cascade')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
