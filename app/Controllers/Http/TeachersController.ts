import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'
import { DateTime } from 'luxon'

export default class TeachersController {
  public async show({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()
    try {
      let teacher: Teacher | null = await Teacher.findBy('matricula', body.matricula)
      if (teacher) {
        response.status(200)
        return teacher
      } else {
        response.status(404)
        return { message: 'Professor não encontrado!' }
      }
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir a solicitação dos dados, contate seu administrador!',
      }
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()
    try {
      let teacher: Teacher | null = await Teacher.findBy('matricula', body.matricula)
      if (teacher) {
        response.status(409)
        return { message: 'Professor já se encontra cadastrado!' }
      }
      let dataParsed: DateTime = DateTime.fromFormat(body.nascimento, 'yyyy-LL-dd')
      teacher = await Teacher.create({
        nome: body.nome,
        email: body.email,
        matricula: body.matricula,
        nascimento: dataParsed,
      })
      response.status(201)
      return teacher
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de cadastro, contate seu administrador!',
      }
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()

    try {
      const teacher: Teacher | null = await Teacher.findBy('matricula', body.matricula)
      if (!teacher) {
        response.status(404)
        return { message: 'Professor não encontrado!' }
      }
      let dataParsed: DateTime = DateTime.fromFormat(body.nascimento, 'yyyy-LL-dd')
      let dataUpdate: Teacher = await teacher
        .merge({
          nome: body.nome,
          email: body.email,
          matricula: body.matricula,
          nascimento: dataParsed,
        })
        .save()
      response.status(201)
      return dataUpdate
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de cadastro, contate seu administrador!',
      }
    }
  }
  public async destroy({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()
    try {
      let teacher: Teacher | null = await Teacher.findBy('matricula', body.matricula)
      if (!teacher) {
        response.status(404)
        return { message: 'Professor não encontrado!' }
      }
      await teacher.delete()
      response.status(204)
    } catch (err: any) {
      response.status(500)
      return {
        message:
          'Error ao concluir a solicitação da exclusão dos dados, contate seu administrador!',
      }
    }
  }
}
