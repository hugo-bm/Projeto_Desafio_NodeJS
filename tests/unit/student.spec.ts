import { test } from '@japa/runner'
import Student from 'App/Models/Student'
import { DateTime } from 'luxon'

test.group('Student', () => {
  test('Teste de atribuição de valores', ({ assert }) => {
    const student: Student = new Student()
    student.nome = 'Primeiro Segundo Sobrenome'
    student.email = 'emaiL_email@provedor.com'
    student.nascimento = DateTime.local(2000, 3, 17, { locale: 'br' })
    student.matricula = 'E8526'
    assert.equal('Primeiro Segundo Sobrenome', student.nome)
    assert.equal('emaiL_email@provedor.com', student.email)
    assert.equal('17/03/2000', student.nascimento.toLocaleString())
  })
})
