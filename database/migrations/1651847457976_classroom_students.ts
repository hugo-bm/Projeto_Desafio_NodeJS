import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassroomStudents extends BaseSchema {
  protected tableName = 'classroom_student'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('classroom_id').notNullable()
      table.foreign('classroom_id').references('classrooms.id').onDelete('cascade')
      table.integer('student_id').notNullable()
      table.foreign('student_id').references('students.id').onDelete('cascade')
      table.unique(['student_id', 'classroom_id'])
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
