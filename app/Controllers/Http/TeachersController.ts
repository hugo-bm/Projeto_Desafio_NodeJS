import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async show() {}
  public async store({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()
    let { nome, email, matricula, nascimento } = body

    try {
      let teacher: Teacher = new Teacher()
      teacher.nome = nome
      teacher.email = email
      teacher.matricula = matricula
      teacher.nascimento = nascimento
      await teacher.save()
      response.status(201)
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de cadastro, contate seu administrador!',
      }
    }
    return {
      message: `${nome} cadastrado com sucesso!`,
    }
  }
  public async update() {}
  public async destroy() {}
}
