import { schema, rules } from '@ioc:Adonis/Core/Validator'

const classroomSchemas = {
  persistSchema: schema.create({
    numero: schema.string({ trim: true }, [rules.regex(/^[0-9]+$/)]),
    capacidade: schema.number([rules.unsigned()]),
    disponivel: schema.boolean(),
    matricula_prof: schema.string({ trim: true }),
  }),
  showAndDeleteSchema: schema.create({
    numero: schema.string({ trim: true }, [rules.regex(/^[0-9]+$/)]),
    matricula_prof: schema.string({ trim: true }),
  }),
  allocAndDeallocateSchema: schema.create({
    numero: schema.string({ trim: true }, [rules.regex(/^[0-9]+$/)]),
    matricula_prof: schema.string({ trim: true }),
    matricula_estud: schema.string({ trim: true }),
  }),
  allStudents: schema.create({
    numero: schema.string({ trim: true }, [rules.regex(/^[0-9]+$/)]),
    matricula_prof: schema.string({ trim: true }),
  }),
  studentAllClassroom: schema.create({
    matricula_estud: schema.string({ trim: true }),
  }),
}

export default classroomSchemas
