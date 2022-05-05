import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import personSchema from 'App/Schemas/personSchema'

export default class StudentsController {
  public async show({ request, response }: HttpContextContract) {
    const params: Record<string, any> = request.params()
    try {
      let student: Student | null = await Student.findBy('matricula', params.matricula)
      if (student) {
        response.status(200)
        return student
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
      let student: Student | null = await Student.findBy('matricula', payload.matricula)
      if (student) {
        response.status(409)
        return { message: 'Professor já se encontra cadastrado!' }
      }
      student = await Student.create({
        nome: payload.nome,
        email: payload.email,
        matricula: payload.matricula,
        nascimento: payload.nascimento,
      })
      response.status(201)
      return student
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
      const teacher: Student | null = await Student.findBy('matricula', payload.matricula)
      if (!teacher) {
        response.status(404)
        return { message: 'Professor não encontrado!' }
      }

      let dataUpdate: Student = await teacher
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
        message: 'Error ao concluir o processo de cadastro, contate seu administrador!',
      }
    }
  }
  public async destroy({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()
    try {
      let student: Student | null = await Student.findBy('matricula', body.matricula)
      if (!student) {
        response.status(404)
        return { message: 'Professor não encontrado!' }
      }
      await student.delete()
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
