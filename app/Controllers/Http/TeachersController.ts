import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'
import personSchema from 'App/Schemas/personSchema'

export default class TeachersController {
  public async show({ request, response }: HttpContextContract) {
    const params: Record<string, any> = request.params()
    try {
      let teacher: Teacher | null = await Teacher.findBy('matricula', params.matricula)
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
    const payload = await request.validate({ schema: personSchema })
    try {
      let teacher: Teacher | null = await Teacher.findBy('matricula', payload.matricula)
      if (teacher) {
        response.status(409)
        return { message: 'Professor já se encontra cadastrado!' }
      }
      teacher = await Teacher.create({
        nome: payload.nome,
        email: payload.email,
        matricula: payload.matricula,
        nascimento: payload.nascimento,
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
    const payload = await request.validate({ schema: personSchema })

    try {
      const teacher: Teacher | null = await Teacher.findBy('matricula', payload.matricula)
      if (!teacher) {
        response.status(404)
        return { message: 'Professor não encontrado!' }
      }

      let dataUpdate: Teacher = await teacher
        .merge({
          nome: payload.nome,
          email: payload.email,
          matricula: payload.matricula,
          nascimento: payload.nascimento,
        })
        .save()
      response.status(200)
      return dataUpdate
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de atualização de dados, contate seu administrador!',
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
