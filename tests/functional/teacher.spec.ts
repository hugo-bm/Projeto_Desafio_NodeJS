import { test } from '@japa/runner'

test.group('Teacher', () => {
  test('Cadastrar dados do Professor', async ({ client }) => {
    const response = await client.post('/api/teacher/create').form({
      nome: 'Professor name',
      email: 'professor_1@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'P7342',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      nome: 'Professor name',
      email: 'professor_1@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'P7342',
    })
  })
  test('Consulta a dados de cadastro', async ({ client }) => {
    const response = await client.get('/api/teacher/P7342')

    response.assertStatus(200)
    response.assertBodyContains({
      nome: 'Professor name',
      email: 'professor_1@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'P7342',
    })
  })
  test('Atualizar dados do Professor', async ({ client }) => {
    const response = await client.post('/api/teacher/edit').form({
      nome: 'Oslvado',
      email: 'professor_1@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'P7342',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      nome: 'Oslvado',
      email: 'professor_1@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'P7342',
    })
  })
  test('Remover dados do Professor', async ({ client }) => {
    const response = await client.delete('/api/teacher/delete').form({ matricula: 'P7342' })

    response.assertStatus(204)
  })
})
