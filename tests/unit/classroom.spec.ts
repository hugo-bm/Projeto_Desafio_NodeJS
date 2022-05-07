import { test } from '@japa/runner'
import Classroom from 'App/Models/Classroom'

test.group('Classroom', () => {
  test('Teste de atribuição de valores', async ({ assert }) => {
    let classroom: Classroom = new Classroom()
    classroom.numero = '857'
    classroom.capacidade = 53
    classroom.disponivel = true
    classroom.id_prof = 1
    assert.equal('857', classroom.numero)
    assert.equal(53, classroom.capacidade)
    assert.equal(true, classroom.disponivel)
    assert.equal(1, classroom.id_prof)
  })
})
