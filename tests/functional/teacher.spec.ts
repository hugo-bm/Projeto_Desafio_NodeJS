import { test } from '@japa/runner'

test.group('Teacher', () => {
  test('Consulta a dados de cadastro', async ({ client }) => {
    const response = await client.post('/api/teacher').form({
      nome: 'Professor 1',
      email: 'professor_1@gmail.com',
      nascimento: '17/03/2000',
      matricula: 'P7342',
    })

    response.assertStatus(201)
    response.assertBodyContains({ teste: 'endpoint_Professor 1' })
  })
})
