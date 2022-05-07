import { test } from '@japa/runner'

test.group('Classrooms', () => {
  test('Cadastrar dados da sala', async ({ client }) => {
    const response = await client.post('/api/classroom/create').form({
      numero: '5263',
      capacidade: 20,
      disponivel: 1,
      matricula_prof: 'P7001',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      numero: '5263',
      capacidade: 20,
      disponivel: true,
    })
  })
  test('Consultar dados de cadastro', async ({ client }) => {
    const response = await client.get('/api/classroom/P7001/5263')

    response.assertStatus(200)
    response.assertBodyContains({
      numero: '5263',
      capacidade: 20,
      disponivel: 1,
    })
  })
  test('Atualizar dados da sala', async ({ client }) => {
    const response = await client.post('/api/classroom/edit').form({
      numero: '5263',
      capacidade: 27,
      disponivel: 1,
      matricula_prof: 'P7001',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      numero: '5263',
      capacidade: 27,
      disponivel: true,
    })
  })

  test('Alocar estudante na sala', async ({ client }) => {
    const response = await client.post('/api/classroom/alloc').form({
      numero: '5263',
      matricula_prof: 'P7001',
      matricula_estud: 'E0703',
    })

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Estudante alocado com sucesso!' })
  })
  test('Consultar salas do Estudante', async ({ client }) => {
    const response = await client.get('api/classroom/student/E0703')
    response.assertStatus(200)
    response.assertBodyContains({
      estudante: 'Estudante F',
      salas: [
        {
          professor: 'Professor F',
          sala: '5263',
        },
      ],
    })
  })
  test('Consultar estudantes da sala', async ({ client }) => {
    const response = await client.get('api/classroom/allStudents/P7001/5263')

    response.assertStatus(200)
    response.assertBodyContains([
      {
        nome: 'Estudante F',
        email: 'estudante_2@gmail.com',
        matricula: 'E0703',
        nascimento: '2000-03-17',
      },
    ])
  })
  test('Remover estudante na sala', async ({ client }) => {
    const response = await client.post('/api/classroom/deallocate').form({
      numero: '5263',
      matricula_prof: 'P7001',
      matricula_estud: 'E0703',
    })

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Estudante desalocado com sucesso!' })
  })
  test('Remover dados da sala', async ({ client }) => {
    const response = await client.delete('/api/classroom/delete').form({
      numero: '5263',
      matricula_prof: 'P7001',
    })

    response.assertStatus(204)
  })
})
