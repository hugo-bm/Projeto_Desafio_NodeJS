import { test } from '@japa/runner'
import Student from 'App/Models/Student'
import { DateTime } from 'luxon'

test.group('Student', () => {
  test('Teste de atribuição de valores', ({ assert }) => {
    const teacher: Student = new Student()
    teacher.nome = 'Primeiro Segundo Sobrenome'
    teacher.email = 'emaiL_email@provedor.com'
    teacher.nascimento = DateTime.local(2000, 3, 17, { locale: 'br' })
    assert.equal('Primeiro Segundo Sobrenome', teacher.nome)
    assert.equal('emaiL_email@provedor.com', teacher.email)
    assert.equal('17/03/2000', teacher.nascimento.toLocaleString())
  })
})
