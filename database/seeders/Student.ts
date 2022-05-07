import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Student from 'App/Models/Student'
import { DateTime } from 'luxon'

export default class StudentSeeder extends BaseSeeder {
  public async run() {
    await Student.create({
      nome: 'Estudante F',
      email: 'estudante_2@gmail.com',
      matricula: 'E0703',
      nascimento: DateTime.local(2000, 3, 17, { locale: 'br' }),
    })
  }
}
