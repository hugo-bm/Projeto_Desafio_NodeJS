import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Teacher from 'App/Models/Teacher'
import { DateTime } from 'luxon'

export default class TeacherSeeder extends BaseSeeder {
  public async run() {
    await Teacher.create({
      nome: 'Professor F',
      email: 'professor_37@gmail.com',
      matricula: 'P7001',
      nascimento: DateTime.local(2000, 3, 17, { locale: 'br' }),
    })
  }
}
