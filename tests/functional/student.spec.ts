import { test } from '@japa/runner'

test.group('Student', () => {
  test('Cadastrar dados do Estudante', async ({ client }) => {
    const response = await client.post('/api/student/create').form({
      nome: 'Estudante name',
      email: 'estudante_2@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'E1932',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      nome: 'Estudante name',
      email: 'estudante_2@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'E1932',
    })
  })
  test('Consulta a dados de cadastro', async ({ client }) => {
    const response = await client.get('/api/student/E1932')

    response.assertStatus(200)
    response.assertBodyContains({
      nome: 'Estudante name',
      email: 'estudante_2@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'E1932',
    })
  })
  test('Atualizar dados do Estudante', async ({ client }) => {
    const response = await client.post('/api/student/edit').form({
      nome: 'Pedro',
      email: 'estudante_2@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'E1932',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      nome: 'Pedro',
      email: 'estudante_2@gmail.com',
      nascimento: '2000-03-17',
      matricula: 'E1932',
    })
  })
  test('Remover dados do Estudante', async ({ client }) => {
    const response = await client.delete('/api/student/delete').form({ matricula: 'E1932' })

    response.assertStatus(204)
  })
})
