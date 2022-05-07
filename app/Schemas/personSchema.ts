import { schema, rules } from '@ioc:Adonis/Core/Validator'
const personSchema = schema.create({
  nome: schema.string([rules.alpha({ allow: ['space'] })]),
  email: schema.string([rules.email({ ignoreMaxLength: true })]),
  matricula: schema.string({ trim: true }),
  nascimento: schema.date({ format: 'yyyy-MM-dd' }),
})
export default personSchema
