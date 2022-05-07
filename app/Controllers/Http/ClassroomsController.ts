import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import Student from 'App/Models/Student'
import Teacher from 'App/Models/Teacher'
import classroomSchemas from 'App/Schemas/classroomSchema'

export default class ClassroomsController {
  public async show({ request, response }: HttpContextContract) {
    const payload: Record<string, any> = request.validate({
      schema: classroomSchemas.showAndDeleteSchema,
    })
    if ((await Teacher.findBy('matricula', payload.matricula)) === null) {
      response.status(400)
      return { message: 'Matricula de professor informada é invalida ou professor não encontrado!' }
    }
    try {
      const classroom: Classroom | null = await Classroom.findBy('numero', payload.numero)
      if (classroom === null) {
        response.status(404)
        return { message: 'Sala não encontrada!' }
      }
      response.status(200)
      return classroom
    } catch (err) {
      response.status(500)
      return {
        message: 'Error ao concluir a solicitação dos dados, contate seu administrador!',
      }
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: classroomSchemas.persistSchema })
    try {
      const teacher = await Teacher.findBy('maticula', payload.matricula_prof)
      if (!teacher) {
        response.status(400)
        return {
          message: 'Matricula de professor informada é invalida ou professor não encontrado',
        }
      }
      const classroom = await Classroom.create({
        numero: payload.numero,
        capacidade: payload.capacidade,
        disponivel: payload.disponivel,
        id_prof: teacher?.id,
      })
      response.status(201)
      return classroom
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de cadastro, contate seu administrador!',
      }
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: classroomSchemas.persistSchema })
    try {
      const teacher = await Teacher.findBy('maticula', payload.matricula_prof)
      if (!teacher) {
        response.status(400)
        return {
          message: 'Matricula de professor informada é invalida ou professor não encontrado!',
        }
      }
      const classroom: Classroom | null = await Classroom.findBy('numero', payload.numero)
      if (!classroom) {
        response.status(404)
        return { message: 'Sala não encontrada!' }
      }
      if (classroom.id_prof !== teacher.id) {
        response.status(403)
        return { messsage: 'Porfessor não autorizado!' }
      }
      let dataUpdate = await classroom
        .merge({
          numero: payload.numero,
          capacidade: payload.capacidade,
          disponivel: payload.disponivel,
          id_prof: teacher?.id,
        })
        .save()
      response.status(201)
      return dataUpdate
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de autalização de dados, contate seu administrador!',
      }
    }
  }
  public async destroy({ request, response }: HttpContextContract) {
    const payload: Record<string, any> = request.validate({
      schema: classroomSchemas.showAndDeleteSchema,
    })
    try {
      const teacher = await Teacher.findBy('maticula', payload.matricula_prof)
      if (!teacher) {
        response.status(400)
        return {
          message: 'Matricula de professor informada é invalida ou professor não encontrado!',
        }
      }
      const classroom: Classroom | null = await Classroom.findBy('numero', payload.numero)
      if (!classroom) {
        response.status(404)
        return { message: 'Sala não encontrada!' }
      }
      if (classroom.id_prof !== teacher.id) {
        response.status(403)
        return { messsage: 'Porfessor não autorizado!' }
      }
      await classroom.delete()
      response.status(20)
    } catch (err: any) {
      response.status(500)
      return {
        message: 'Error ao concluir o processo de autalização de dados, contate seu administrador!',
      }
    }
  }
  public async alloc({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: classroomSchemas.allocAndDeallocateSchema })
    const teacher = Teacher.findBy('matricula', payload.matricula_prof)
    if (!teacher) {
      response.status(400)
      return { message: 'Matricula de professor informada é invalida ou professor não encontrado!' }
    }
    const student: Student | null = await Student.findBy('matricula', payload.matricula_estud)
    if (!student) {
      response.status(400)
      return { message: 'Matricula de estudante informada é invalida ou estudante não encontrado!' }
    }
    try {
      const classroom: Classroom | null = await Classroom.findBy('numero', payload.numero)
      if (!classroom) {
        response.status(404)
        return { message: 'Sala não encontrada!' }
      }
      //Query to perform row count
      let students = await Classroom.query()
        .withAggregate('alunos', (query) => {
          query.count('student_id').as('total')
        })
        .firstOrFail()
      if (!classroom.disponivel && students.$extras.total < classroom.capacidade) {
        response.status(404)
        return { message: 'A sala não está dísponivel!' }
      }
      await classroom.related('alunos').save(student, true)
      response.status(200)
      return { message: 'Estudante alocado com sucesso!' }
    } catch (err) {
      response.status(500)
      return { message: 'Error ao concluir a solicitação de alocação, contate seu administrador!' }
    }
  }
  public async deallocate({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: classroomSchemas.allocAndDeallocateSchema })
    const teacher = Teacher.findBy('matricula', payload.matricula_prof)
    if (!teacher) {
      response.status(400)
      return { message: 'Matricula de professor informada é invalida ou professor não encontrado!' }
    }
    const student: Student | null = await Student.findBy('matricula', payload.matricula_estud)
    if (!student) {
      response.status(400)
      return { message: 'Matricula de estudante informada é invalida ou estudante não encontrado!' }
    }
    try {
      const classroom: Classroom | null = await Classroom.findBy('numero', payload.numero)
      if (!classroom) {
        response.status(404)
        return { message: 'Sala não encontrada!' }
      }
      await classroom.related('alunos').detach([student.id])
      response.status(200)
      return { message: 'Estudante alocado com sucesso!' }
    } catch (err) {
      response.status(500)
      return {
        message: 'Error ao concluir a solicitação para desalocar, contate seu administrador!',
      }
    }
  }
  public async allStudentsOnClassroom({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: classroomSchemas.allStudents })
    const teacher = Teacher.findBy('matricula', payload.matricula_prof)
    if (!teacher) {
      response.status(400)
      return { message: 'Matricula de professor informada é invalida ou professor não encontrado!' }
    }
    try {
      const classroom: Classroom | null = await Classroom.findBy('numero', payload.numero)
      if (!classroom) {
        response.status(404)
        return { message: 'Sala não encontrada!' }
      }
      let data: Student[] = await classroom
        .related('alunos')
        .query()
        .wherePivot('classroom_id', classroom.id)
      response.status(200)
      return data
    } catch (err) {
      response.status(500)
      return { message: 'Error ao concluir a solicitação de alocação, contate seu administrador!' }
    }
  }
  public async studentAllClassroom({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: classroomSchemas.studentAllClassroom })
    const student: Student | null = await Student.findBy('matricula', payload.matricula_estud)
    if (!student) {
      response.status(400)
      return { message: 'Matricula de estudante informada é invalida ou estudante não encontrado!' }
    }
    const data = await Classroom.query()
      .from('classroom_student')
      .join('classrooms', (query) => {
        query.on('classroom_student.classroom_id', '=', 'classrooms.id')
      })
      .select('numero')
      .select('id_prof')
    let rooms: Array<Object> = []
    for (let room of data) {
      let teacher = await Teacher.findBy('id', room.id_prof)
      rooms.push({ professor: teacher?.nome, sala: room.numero })
    }
    return { estudante: student.nome, salas: rooms }
  }
}
