import { test } from '@japa/runner'
import Classroom from 'App/Models/Classroom'
import Student from 'App/Models/Student'
import { DateTime } from 'luxon'

test.group('Classroom', () => {
  test('Teste de atribuição de valores', async ({ assert }) => {
    let classroom: Classroom = new Classroom()
    classroom.numero = '853'
    classroom.capacidade = 53
    classroom.disponivel = true
    classroom.id_prof = 1
    classroom = await classroom.save()
    let student = new Student()
    student.nome = 'Primeiro Segundo Sobrenome'
    student.email = 'emaiL_email@provedor.com'
    student.nascimento = DateTime.local(2000, 3, 17, { locale: 'br' })
    student.matricula = 'E8526'
    await classroom.related('alunos').save(student, true)
    await classroom.related('alunos').query().wherePivot('classroom_id', 1)
    assert.equal('853', classroom.numero)
    assert.equal(53, classroom.capacidade)
    assert.equal(true, classroom.disponivel)
    assert.equal(1, classroom.id_prof)
  })
})
