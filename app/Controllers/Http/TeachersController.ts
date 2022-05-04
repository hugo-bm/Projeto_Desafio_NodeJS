import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeachersController {
  public async show() {}
  public async store({ request, response }: HttpContextContract) {
    const body: Record<string, any> = request.body()
    let { nome } = body
    response.status(201)
    return {
      teste: `endpoint_${nome}`,
    }
  }
  public async update() {}
  public async destroy() {}
}
